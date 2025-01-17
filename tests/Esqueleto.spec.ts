import { test, Browser, Page, expect } from '@playwright/test';
 
(async () => {
  let browser: Browser;
  let page: Page;


  test.describe('Acciones en el automation', () => {

        test('Click en tal boton dinamico', async ({ page }) => {

            await test.step('Dado que navego', async () => {

                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
                
            })
            

            
        })
        
    
  })
  

})();