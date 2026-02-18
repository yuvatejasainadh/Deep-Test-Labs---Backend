import fs from "fs";
import https from "https";
import { execSync } from "child_process";
import path from "path";

const url =
  "https://github.com/grafana/k6/releases/download/v0.49.0/k6-v0.49.0-linux-amd64.tar.gz";

const downloadPath = path.resolve("k6.tar.gz");

console.log("⬇️ Downloading k6 binary...");

https.get(url, (res) => {
  const file = fs.createWriteStream(downloadPath);
  res.pipe(file);

  file.on("finish", () => {
    file.close();
    console.log("📦 Extracting k6...");

    execSync("tar -xzf k6.tar.gz");
    execSync("mv k6-v0.49.0-linux-amd64/k6 ./k6");
    execSync("chmod +x ./k6");

    console.log("✅ k6 installed successfully");
  });
});
