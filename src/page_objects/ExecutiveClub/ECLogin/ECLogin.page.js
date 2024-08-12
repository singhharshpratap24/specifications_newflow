const { expect } = require('chai');
const LOGGER = require('../../../setup/logger');
const PageElements = require("../../../PageElements/ExecutiveClub/Login.pagelements");
const HomePageLocators = require('../../../PageElements/FlightSelling/Home_Page.js')
const UTILS = require('../../../Helpers/utils.js');
const utils= new UTILS();

class ECLogin {
    
    async IDPLogin(ecMemberDetails) {
        let username = await page.locator(PageElements.ECLogin.locate_username);
        let password = await page.locator(PageElements.ECLogin.locate_password);
        let loginBtn = await page.locator(PageElements.ECLogin.locate_login_button);
        let myAccount = await page.locator(PageElements.ECLogin.locate_my_account_page);
        
        for (let i = 0; i < PageElements.ECLogin.locate_homepage_log_in.length; i++) {
            let login_page_btn = await page.locator(PageElements.ECLogin.locate_homepage_log_in[i]);
            if (await login_page_btn.isVisible()) {
                await login_page_btn.click();
               await page.waitForLoadState('domcontentloaded');
                await utils.confirmPageLoad();
                break;
            }
        }
     
        await username.type(ecMemberDetails.username, { delay: 100 });
        await password.type(ecMemberDetails.password, { delay: 100 });
        await loginBtn.click();
        try {
            await page.waitForLoadState();
            let isEcMemberLoggedIn = await myAccount.isVisible();
            if (!isEcMemberLoggedIn) {
                await page.reload();
                await page.waitForLoadState();
                LOGGER.info('EC Member Logged In Successfully', { classname: 'ECLogin' });
            }

        } catch (error) {
            console.log(`[ERROR] : ${error}`)
        }
    }



    async navigateToECHomepage() {
        try {
            let myAccount = await page.locator(PageElements.ECLogin.locate_my_account_page);
            let ec_member_name = await page.locator(PageElements.ECLogin.locate_ec_member_name);
            let ec_member_icon = await page.locator(PageElements.ECLogin.locate_ec_member_icon);
            let homePageTabs = await page.$$(HomePageLocators.homePage.locate_home_page_tabs);
            let manageTabElement = await homePageTabs[2];
            let executiveClub_Link = await page.locator(PageElements.ECLogin.locate_executiveClub_link);
            let myAccount_linkText = await page.locator(PageElements.ECLogin.locate_myAccount_linkText);
            let ec_homepage_welcome_banner = await page.locator(PageElements.ECLogin.locate_ec_homepage_welcome_banner);

            await page.waitForTimeout(4000);

            if (await myAccount.isVisible()) {
                await myAccount.click();
            }
            else if (await ec_member_name.isVisible()) {
                await ec_member_name.click();
            }
            else if (await manageTabElement.isVisible()) {
                await manageTabElement.hover();
                await executiveClub_Link.click();
            }
            else if (myAccount_linkText.isVisible()) {
                await myAccount_linkText.click()
            }
            else {
                await ec_member_icon.click();
            }

            await page.waitForLoadState();
            await ec_homepage_welcome_banner.waitFor();
            let ec_Account_Page_Title = await page.locator(PageElements.ECLogin.locate_EC_Account_Page_title).textContent();
            expect(ec_Account_Page_Title.trim()).to.equal("British Airways - My Account")
            LOGGER.info('EC Homepage is Loaded', { classname: 'ECLogin' });
        } catch (error) {
            console.error(`An error occurred: ${error.message}`);
        }
    }

    async clickOnLoginButton()
    {
        for (let i = 0; i < PageElements.ECLogin.locate_homepage_log_in.length; i++) {
            let login_page_btn = await page.locator(PageElements.ECLogin.locate_homepage_log_in[i]);
            if (await login_page_btn.isVisible()) {
                await login_page_btn.click();
                await page.waitForLoadState('domcontentloaded');
                await utils.confirmPageLoad();
                break;
            }
        }
    }

    async loginOnFareQuotePage(ecMemberDetails){
        let username = await page.locator(PageElements.ECLogin.locate_username);
        let password = await page.locator(PageElements.ECLogin.locate_password);
        let loginBtn = await page.locator(PageElements.ECLogin.locate_login_button);

        await loginBtn.waitFor();
        
        await username.type(ecMemberDetails.username, { delay: 100 });
        await password.type(ecMemberDetails.password, { delay: 100 });

        await loginBtn.click();
    }
}
module.exports = ECLogin