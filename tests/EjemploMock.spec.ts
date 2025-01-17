import { test, expect } from '@playwright/test';
 
test('Obtengo la respuesta real y le agrego algo no tan real', async ({ page }) => {
    // Obtenemos la respuesta y le agregamos un extra
    await page.route('*/**/api/v1/fruits', async route => {
        const response = await route.fetch(); //esta guardando el resultado de la consulta 
        const json = await response.json();  //esta convirtiendo la respuesta de la consulta a la pagina a formato json y agregandola a una constante
        console.log('el json antes de modificar', json)
        json.push({ name: 'Cristiano Ronaldo', id: 200 });  // usando la constante que acabamos de crear le agrega al final otro elemento llamado cr7
        // Obtenemos la respuesta real mientras que le agregamos un extra
        // al objeto JSON que va a estar siendo representado.
        console.log('el json despues de modificar', json)
        await route.fulfill({ response, json });
    });
 
    // Vamos a la página
    await page.goto('https://demo.playwright.dev/api-mocking');  
 
    // Validamos que vino la respuesta real con el extra que le sumamos antes
    await expect(page.getByText('Cristiano Ronaldo', { exact: true })).toBeVisible();
});