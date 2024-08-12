const LOGGER = require('../../../setup/logger');

class BookingConfirmation {

    async getBookedPNR ()
    {
        await page.getByText('Your booking reference is').isVisible();

        pnr = await page.locator('xpath=/html/body/app-root/main/app-confirmation/ba-page-segment[1]/div/div/app-confirmation-hero/ba-content[2]/p[2]').textContent();
      
        LOGGER.info('PNR Booking Successfull. Your booking reference is : ' + pnr);
    }
}
module.exports = BookingConfirmation ;