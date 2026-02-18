import { execSync } from "child_process";
import fs from "fs";

if (!fs.existsSync("./k6")) {
  console.log("📦 Extracting bundled k6 binary...");
  execSync("tar -xzf bin/k6-v0.49.0-linux-amd64.tar.gz");
  execSync("mv k6-v0.49.0-linux-amd64/k6 ./k6");
  execSync("chmod +x ./k6");
  console.log("✅ k6 ready");
} else {
  console.log("⚡ k6 already exists");
}
