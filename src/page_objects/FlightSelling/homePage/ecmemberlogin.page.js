const { expect } = require("chai");
const ECmemberLoginElement = require('../../../PageElements/FlightSelling/ECmemberLogin_page.js')
class ECMemberLogin {

    
  
    async LoginWithCredentials (username, password)
    {
        try{
        const logInBtn=await page.locator(ECmemberLoginElement.ecmemberlogin.LoginBtn);
        await logInBtn.click();
        await page.locator(ECmemberLoginElement.ecmemberlogin.LoginID).fill(username);
        await page.locator(ECmemberLoginElement.ecmemberlogin.Password).fill(password);
        const LogInbtn=  await page.locator(ECmemberLoginElement.ecmemberlogin.LoginSubmit);
        await LogInbtn.click()
        await page.waitForTimeout(20000);
        // it will validate my account details visible or not after login 
         const isMyAccountVisible =await page.locator(ECmemberLoginElement.ecmemberlogin.MyAccountDetail);
        const MyAccountlink=await isMyAccountVisible .isVisible();
        expect(MyAccountlink).to.be.true;
        console.log ("ECMember Login successfull...");
        }
        catch(error)
        {
            console.error("[ASSERTION ERROR]ECMemberLogin:LoginWithCredentials")
            console.log("ECMember login failed....")
        }
    }
}

module.exports = ECMemberLogin ;