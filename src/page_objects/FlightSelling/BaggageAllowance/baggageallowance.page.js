const baggageallowanceElements = require('../../../PageElements/FlightSelling/Baggageallowance_page.js')

class BaggageAllowance {
  


    async farequotePageDisplayed() {
      await page.waitForTimeout(10000);
     let page_title=await page.locator(baggageallowanceElements.baggageAllowance.locate_page_title).textContent();
     
      let pagetitle= await page.title();
      console.log(pagetitle);
      //expect(page_title).should.eq(pagetitle)
      expect(pagetitle).to.equal(page_title);
      


    };

    async checkedBaggageDisplayed() {
      const baggageAllowance = await page.locator(baggageallowanceElements.baggageAllowance.locate_baggage_allowance);
      const checkedBaggage = await page.locator(baggageallowanceElements.baggageAllowance.locate_baggage_allowance);
 
      await baggageAllowance.waitFor();
      await baggageAllowance.click();
 
      await checkedBaggage.waitFor();
      let isVisibleCheckedBaggage = await checkedBaggage.isVisible();
      expect(isVisibleCheckedBaggage).to.be.true
    


    }

    async verifyNoCheckedbaggageAllowance() {
      await page.locator(baggageallowanceElements.baggageAllowance.locate_baggage_allowance).click();
      await page.waitForTimeout(10000);
      const verifyBaggageAllowanace = await page.locator(baggageallowanceElements.baggageAllowance.locate_checked_baggage_allowance).textContent();
      try {
        await expect(verifyBaggageAllowanace.includes(" No checked baggage "));
        console.log("checked baggage allowance is :", verifyBaggageAllowanace);
      }
      catch (error) {
        console.error("[ASSERTION ERROR] checked baggage allowance is:", verifyBaggageAllowanace);
      }
    }


}
module.exports = BaggageAllowance;
