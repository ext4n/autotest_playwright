// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false, // для видео-демо можно включить браузер
    screenshot: 'only-on-failure',
    video: 'on',
    baseURL: 'https://rahulshettyacademy.com/seleniumPractise/#/',
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});
