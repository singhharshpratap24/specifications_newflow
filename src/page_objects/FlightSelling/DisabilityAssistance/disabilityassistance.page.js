const DisabilityAssistanceElements = require('../../../PageElements/FlightSelling/DisabilityAssistance_page.js')

class DisabilityAssistance {
  
    
    
    
    async disabilityAssistancePageDisplayed()
        {
            const pagePromise = context.waitForEvent('page');
            const newPage = await pagePromise;
            await newPage.waitForLoadState();
            
            let pagetitle= await newPage.title();
            
                  console.log(pagetitle);
                  
                  expect(pagetitle).to.equal('What assistance is available? | Disability assistance | British Airways');
        }
    
    }
    module.exports = DisabilityAssistance;
    