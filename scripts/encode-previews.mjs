import { createRequire } from "module";
import { execFileSync } from "child_process";
import { existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const require = createRequire(import.meta.url);
const ffmpegPath = require("ffmpeg-static");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const slugs = ["long-form", "short-form", "gen-ai"];
const nums = [1, 2, 3, 4];

const outDir = path.join(root, "public", "videos", "previews");
mkdirSync(outDir, { recursive: true });

for (const slug of slugs) {
  for (const n of nums) {
    const input = path.join(root, "public", "videos", `${slug}-${n}.mp4`);
    const output = path.join(outDir, `${slug}-${n}.mp4`);

    if (!existsSync(input)) {
      console.log(`SKIP (no source): ${slug}-${n}.mp4`);
      continue;
    }

    if (existsSync(output)) {
      console.log(`SKIP (exists): previews/${slug}-${n}.mp4`);
      continue;
    }

    console.log(`Encoding: previews/${slug}-${n}.mp4 ...`);
    execFileSync(
      ffmpegPath,
      [
        "-i",
        input,
        "-ss",
        "0",
        "-t",
        "4",
        "-vf",
        "scale=-2:min(540\\,ih)",
        "-c:v",
        "libx264",
        "-crf",
        "32",
        "-preset",
        "fast",
        "-an",
        "-movflags",
        "+faststart",
        "-y",
        output,
      ],
      { stdio: "inherit" },
    );
    console.log(`Done: previews/${slug}-${n}.mp4`);
  }
}

console.log("\nAll previews encoded.");
