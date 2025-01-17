import { test, expect } from '@playwright/test';

test('test22', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=freerange+tester&oq=freerange+tester&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDMwNzBqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Free Range Testers Free Range' }).click();
  await page.getByRole('link', { name: 'Cursos', exact: true }).click();
});