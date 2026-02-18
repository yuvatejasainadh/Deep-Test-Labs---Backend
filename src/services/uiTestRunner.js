import { exec } from "child_process";

export const runUITests = (baseUrl) => {
  return new Promise((resolve, reject) => {
    const command = `npx playwright test --reporter=json`;

    exec(
      command,
      {
        cwd: process.cwd(),
        env: { ...process.env, TARGET_URL: baseUrl },
      },
      (error, stdout, stderr) => {
        console.log("Playwright STDOUT:", stdout);
        console.log("Playwright STDERR:", stderr);

        if (error) return reject(stderr || error.message);

        try {
          const result = JSON.parse(stdout);
          resolve(result);
        } catch (e) {
          resolve({ raw: stdout });
        }
      }
    );
  });
};
