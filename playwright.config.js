import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/ui", // 👈 tell Playwright where tests exist
  timeout: 30000,
  reporter: [["json"]],
  use: {
    headless: true,
  },
});
