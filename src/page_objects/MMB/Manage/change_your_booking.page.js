class ChangeYourBooking {

    async changeYourBooking() {

        await page.getByRole('link', { name: 'Change your booking' }).click();

    }

    async cancelflightchanges() {
        await page.getByRole('link', { name: 'Cancel flight changes and exit' }).click();

    }

}

module.exports = ChangeYourBooking;
