import { expect, type Locator, type Page } from '@playwright/test';
 
export class SandboxPage {  // esta es la clase para usarla luego en el archivo de los test case
    readonly page: Page;   //definiendo una constante page de tipo page
    readonly pastaCheckbox: Locator;  //definiendo una constante de tipo locator
 
    constructor(page: Page) {
        this.page = page; //una instancia de pagiona
        this.pastaCheckbox = page.getByLabel('Pasta 🍝'); //crea el locator al atributo pastaCheckbox
    }
 
    async checkPasta() {  //esto es un metodo de la clase sandBox que se usa para hacer el check en el locator pasta
        await this.pastaCheckbox.check();
    }
    async uncheckPasta() {  //esto es un metodo de la clase sandBox que se usa para hacer el check en el locator pasta
        await this.pastaCheckbox.uncheck();
        console.log('Deselecionar la pasta')
    }

    
 
    async verifyPastaChecked() {  // esto no se usa
        expect(this.pastaCheckbox).toBeChecked;
    }
}