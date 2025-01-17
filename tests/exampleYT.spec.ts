import { test, expect } from '@playwright/test';

test('Visitar mercado Libre', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.do/');
  await page.fill('#cb1-edit', 'tenis');
  await page.keyboard.press('Enter');
  await expect(
    page.locator('#root-app > div > div.ui-search-main.ui-search-main--without-header.ui-search-main--only-products > section')).toBeVisible();
  await page.pause();
});

test('test youtube diferentes movil', async ({ page }) => {
  // Navegar al sitio web
  await page.goto('https://www.mercadolibre.com.co');

  // Llenar el campo de búsqueda con "Iphone" y presionar Enter
  await page.locator('input[id="cb1-edit"]').fill('Iphone');
  await page.keyboard.press('Enter');

  // Verificar que los resultados sean visibles
  await expect(
    page.locator('//ol[contains(@class, \"ui-search-layout\")]')
  ).toBeVisible();

  // Obtener los títulos de los resultados de búsqueda
  const titles = await page
    .locator('//ol[contains(@class, "ui-search-layout")]//li//h2')
    .allInnerTexts();

  // Imprimir el número total de resultados
  console.log('The total number of results is:', titles.length);

  // Iterar sobre los títulos e imprimirlos en la consola
  for (let title of titles) {
    console.log('The title is:', title);
  }
});

