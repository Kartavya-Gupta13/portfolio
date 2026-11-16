// Re-encode full work-card clips to a 720p cap (short side), H.264 crf 28,
// faststart. Cards render ~280–500 CSS px wide, so 1080p is wasted bytes.
// Audio is copied untouched (back-face player has controls, viewers can unmute).
// Only replaces the source if the new file is smaller.
import { createRequire } from "module";
import { execFileSync } from "child_process";
import { renameSync, statSync, unlinkSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const require = createRequire(import.meta.url);
const ffmpegPath = require("ffmpeg-static");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const slugs = ["long-form", "short-form", "gen-ai"];
const mb = (b) => (b / 1048576).toFixed(2);

for (const slug of slugs) {
  for (const n of [1, 2, 3, 4]) {
    const input = path.join(root, "public", "videos", `${slug}-${n}.mp4`);
    if (!existsSync(input)) continue;
    const tmp = input.replace(/\.mp4$/, ".tmp.mp4");

    execFileSync(
      ffmpegPath,
      [
        "-hide_banner",
        "-loglevel",
        "error",
        "-i",
        input,
        "-vf",
        "scale='if(lt(iw,ih),min(720,iw),-2)':'if(lt(iw,ih),-2,min(720,ih))':flags=lanczos",
        "-c:v",
        "libx264",
        "-profile:v",
        "high",
        "-pix_fmt",
        "yuv420p",
        "-crf",
        "28",
        "-preset",
        "slow",
        "-r",
        "30",
        "-c:a",
        "copy",
        "-movflags",
        "+faststart",
        "-y",
        tmp,
      ],
      { stdio: "inherit" },
    );

    const before = statSync(input).size;
    const after = statSync(tmp).size;
    if (after < before) {
      renameSync(tmp, input);
      console.log(`${slug}-${n}: ${mb(before)} -> ${mb(after)} MB`);
    } else {
      unlinkSync(tmp);
      console.log(`${slug}-${n}: kept original (${mb(before)} MB)`);
    }
  }
}
