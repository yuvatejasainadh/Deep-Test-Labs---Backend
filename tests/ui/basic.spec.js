import { test, expect } from "@playwright/test";

test("Basic page load test", async ({ page }) => {
  const baseUrl = process.env.TARGET_URL;

  if (!baseUrl) {
    throw new Error("TARGET_URL not provided. Project baseUrl is required.");
  }

  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

  // Ensure page loaded successfully
  await expect(page).toHaveTitle(/.+/);
});

test("Navigation links test", async ({ page }) => {
  const baseUrl = process.env.TARGET_URL;

  if (!baseUrl) {
    throw new Error("TARGET_URL not provided. Project baseUrl is required.");
  }

  await page.goto(baseUrl);

  // Validate at least one navigation link exists
  const links = await page.locator("a").count();
  expect(links).toBeGreaterThan(0);
});
