import { test, Browser, Page, expect } from '@playwright/test';
import { SandboxPage } from './Pages/SandboxPage';
 
(async () => {
  let browser: Browser;
  let page: Page;


  test.describe('Acciones en el automation', () => {

        test('Click en tal boton dinamico', async ({ page }) => {

            await test.step('Dado que navego', async () => {

                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
                
            })

            await test.step('Doy click en el boton dinamico', async () => {

                const BotonDinamico =  page.getByRole('button', { name: 'Hacé click para generar un ID' }) //creo una constante con el locator
                await BotonDinamico.click({force:true}) //se forza a que ocurra el click
                //await BotonDinamico.click({button:'right'}) //click derecho
                await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible();
                
            })
            
            

            
        })
        test('Llenando campos', async ({ page }) => {
            await test.step('Dado que navego', async () => {

                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
                
            })

            await test.step('Lleno el campo disponible ', async () => {
                const CampoTexto = page.getByPlaceholder('Ingresá texto')
                await expect(CampoTexto).toBeEditable
                await CampoTexto.fill('Lleno el campo') //ejemplo para llenar el campo
                await expect(CampoTexto).toHaveValue('Lleno el campo') // en este caso reconoce el texto dentro del campo como un valor , no como un texto
            })
            
            
            
        })

        test('Llenando check box y radio button ', async ({ page }) => {
            await test.step('Dado que navego', async () => {

                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
                
            })

            await test.step('Seleciono el checkbox ', async () => {

               await page.getByLabel('Pasta 🍝').check() //para selecionar un check
               await expect(page.getByLabel('Pasta 🍝'),'El campo no estaba selecionado').toBeChecked()   //valida que el elemento este chekeado
               await page.getByLabel('Pasta 🍝').uncheck() //para selecionar un uncheck  
               await expect(page.getByLabel('Pasta 🍝')).not.toBeChecked()             
            })

            await test.step('Seleciono el radio Button ', async () => {
               
              await page.getByLabel('Si').check() //para selecionar un radio button  
            })
            
            
            
        })

        test('Seleciono un dropdown', async ({ page }) => {
            await test.step('Dado que navego', async () => {

                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
                
            })

            await test.step('Seleciono el dropdown deporte ', async () => {

                await page.getByLabel('Dropdown').selectOption('Fútbol') //para trabajr con dropdown

               
               
            })

            await test.step('Seleciono el dropdown  Dia semana ', async () => {

                await page.getByRole('button', { name: 'Día de la semana' }).click() //debo hacer click en el boton previo
                await page.getByRole('link', { name: 'Martes' }).click() //para que asi este boton este visible y poder dar click
               

               
              
            })
            
            
            
        })

        test('Los items del dropdown son los esperados', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {
                const deportes = ['Fútbol', 'Tennis', 'Basketball']
 
                for (let opcion of deportes) {  //asi se puede ejecutar un for en typescript
                    const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
                    if (element) {
                        console.log(`La opción '${opcion}' está presente.`);
                    } else {
                        throw new Error(`La opción '${opcion}' no está presente.`);
                    }
                }
 
            })
 
 
        })

        test('Valido la columna Nombres de la tabla estática', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
 
            await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
                const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];
                //Saca una screen y la adjunta aunque el caso pase el locator usado arriba luego la funcion element recorre los valores que contienen esa segunda columna de la tabla y devuelve un lista
                await test.info().attach('screenshot', {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                })
                expect(valoresColumnaNombres).toEqual(nombresEsperados);
            })
 
        })

        test('Valido que todos los valores cambian en la tabla dinámica luego de un reload', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
 
            await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
                //Creamos un arreglo con todos los valores de la tabla dinámica
                const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresTablaDinamica);
 
                //Hacemos una recarga para que cambien los valores
                await page.reload();
 
                //Creamos un segundo arreglo con los valores luego de la recarga
                const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresPostReload);
 
                //Validamos que todos los valores cambiaron para cada celda.
                expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
 
            })
 
 
        })

        test('Ejemplo de Soft Assertions', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
                await expect.soft(page.getByText('Pizza 🍕'), 'No se encontró el elemento Pizza 🍕').toBeVisible();
                await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontró el elemento Hamburguesa 🍔').toBeVisible();
                await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta 🍝').toBeVisible();
                await expect.soft(page.getByText('Helado 🍧'), 'No se encontró el elemento Helado 🍧').toBeVisible();
                await expect.soft(page.getByText('Torta 🍰'), 'No se encontró el elemento Torta 🍰').toBeVisible();
            })
 
        })

        test('Validando dentro de un popup', async ({ page }) => {
            await test.step('Dado que navego al sandbox', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
 
            await test.step('Cuando hago click en el botón popup', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })
 
            await test.step('Puedo validar un elemento dentro del popup', async () => {
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();
 
            })
 
 
        })

        

        
        
    
  })
  

})();