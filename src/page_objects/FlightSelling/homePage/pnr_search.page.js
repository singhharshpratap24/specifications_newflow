class PNRSearch {

   
    async searchPNRinManage(pnr, name) {
        await page.getByRole('textbox', { name: 'Booking reference' }).click();
        await page.getByRole('textbox', { name: 'Booking reference' }).fill(pnr);
        await page.getByLabel('Last name of passenger').click();
        await page.getByLabel('Last name of passenger').fill(name);
        await page.getByRole('button', { name: 'Find another booking' }).click();

        await page.getByText('We\'re flying you').isVisible();
        console.log('PNR Search done.')
    }

    async searchPNROnECHomePage(pnr,name){
        
       const ManagelinkHover= await page.getByRole('button', { name: 'Manage', exact: true });
        await ManagelinkHover.hover();
        await page.waitForTimeout(40000);
        await page.getByRole('textbox', { name: 'Booking reference' }).click();
        await page.getByRole('textbox', { name: 'Booking reference' }).fill(pnr);
        await page.getByLabel('Last name of passenger').click();
        await page.getByLabel('Last name of passenger').fill(name);
        await page.waitForTimeout(10000);
        await page.getByRole('button', { name: 'Find my booking' }).click();
        await page.waitForTimeout(50000);
     await page.getByText('We\'re flying you').isVisible();
        console.log('PNR Search done.')
    }

}

module.exports =  PNRSearch ;