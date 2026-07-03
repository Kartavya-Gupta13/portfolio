import { createRequire } from "module";
import { execFileSync, execSync } from "child_process";
import { renameSync, statSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const require = createRequire(import.meta.url);
const ffmpegPath = require("ffmpeg-static");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const targets = ["long-form-4", "short-form-3", "long-form-2"];

for (const name of targets) {
  const input = path.join(root, "public", "videos", `${name}.mp4`);
  const tmp = path.join(root, "public", "videos", `${name}.tmp.mp4`);

  const beforeBytes = statSync(input).size;
  const beforeMB = (beforeBytes / 1024 / 1024).toFixed(2);
  console.log(`\n${name}.mp4  before: ${beforeMB} MB`);

  execFileSync(
    ffmpegPath,
    [
      "-i",
      input,
      "-vf",
      "scale=-2:min(1080\\,ih)",
      "-c:v",
      "libx264",
      "-crf",
      "29",
      "-preset",
      "slow",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-movflags",
      "+faststart",
      "-y",
      tmp,
    ],
    { stdio: "inherit" },
  );

  renameSync(tmp, input);

  const afterBytes = statSync(input).size;
  const afterMB = (afterBytes / 1024 / 1024).toFixed(2);
  console.log(
    `${name}.mp4  after:  ${afterMB} MB  (saved ${(beforeMB - afterMB).toFixed(2)} MB)`,
  );
}

console.log("\nAll re-encodes done.");
