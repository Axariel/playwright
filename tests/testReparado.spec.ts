import { test, expect,Page } from '@playwright/test';





test('testAdrian', async ({ page }) => {

       await test.step('Navegando a la pagina',async () =>{
            await page.goto('https://www.freerangetesters.com/');
        

       }) 

       await test.step('Dando click en Cursos',async () =>{
            await  page.getByRole('link', { name: 'Cursos', exact: true }).click()
            await page.waitForURL('**/cursos')
                
       }) 

       await test.step('Validando Titulo',async () =>{
        await expect(page).toHaveTitle('Cursos')
    

       }) 

   
 
  
});


  
  




// await page.goto('https://www.google.com/search?q=freerange+tester&oq=freerange+tester&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDMwNzBqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
// await page.getByRole('link', { name: 'Free Range Testers Free Range' }).click();
// await page.getByRole('link', { name: 'Cursos', exact: true }).click();




