const ExecutiveClubMemberHelper = require('../models/ExecutiveClubMemberHelper.json');
const axios = require('axios');
const qs = require('qs');

class bypassECLogin {

  async setAllowBaCookies() {
    const cookieOptions = { domain: '.baplc.com', path: '/', secure: true };

    await page.context().addCookies([
      { name: 'Allow_BA_Cookies', value: 'accepted', ...cookieOptions },
      { name: 'Allow_BA_Cookies_Date', value: new Date(Date.now()).toString(), ...cookieOptions },
      { name: 'BRITISHAIRWAYS_ENSIGHTEN_PRIVACY_Functional', value: '1', ...cookieOptions },
      { name: 'BRITISHAIRWAYS_ENSIGHTEN_PRIVACY_Marketing', value: '1', ...cookieOptions },
      { name: 'BRITISHAIRWAYS_ENSIGHTEN_PRIVACY_Analytics', value: '1', ...cookieOptions },
      { name: 'BRITISHAIRWAYS_ENSIGHTEN_PRIVACY_MODAL_LOADED', value: '1', ...cookieOptions },
      { name: 'BRITISHAIRWAYS_ENSIGHTEN_PRIVACY_BANNER_VIEWED', value: '1', ...cookieOptions },
      { name: 'BRITISHAIRWAYS_ENSIGHTEN_PRIVACY_MODAL_VIEWED', value: '1', ...cookieOptions },
      { name: 'BRITISHAIRWAYS_ENSIGHTEN_PRIVACY_BANNER_LOADED', value: '1', ...cookieOptions },
    ]);
  }

  async dismissCookieModal_SFD() {
    await page.goto('https://' + process.env.NODE_ENV + '/travel/home/public/en_gb/');
    await page.waitForTimeout(5000);
    await context.clearCookies();
    await this.setAllowBaCookies();
    const cancelButton = await page.locator('#ensCancel');
    const cutomizeCookies = await page.locator('#ensOpenModal');
    await cutomizeCookies.click();
    if (await cancelButton.count() > 0) {
      await cancelButton.click();
    }
  }

  async cookieOption_ECLogin_SFD_Additional(response, user) {
    const addtionalECCookie = { domain: process.env.NODE_ENV, path: '/', secure: true }; //  LoginType + ExecTier + BANGAUTH
    const ecTokenCookie = { domain: process.env.NODE_ENV, path: '/' }; //  TOKENS

    await page.context().addCookies([
      { name: 'BANGAUTH', value: 'true', ...addtionalECCookie },
    ]);

    const cookiesToRemove = { publicAccessToken: 'publicAccessToken', publicRefreshToken: 'publicRefreshToken' }
    const cookies = await context.cookies();

    // console.log('[All Available Cookies] : ', cookies)

    const Update_Cookie_After_Removal_Public_Access_Token = cookies.filter(cookie => cookie.name !== cookiesToRemove.publicAccessToken);
    // console.log('[All Available Cookies after removing publicAccessToken] : ', Update_Cookie_After_Removal_Public_Access_Token)

    const Update_Cookie_After_Removal_Public_Refresh_Token = Update_Cookie_After_Removal_Public_Access_Token.filter(cookie => cookie.name !== cookiesToRemove.publicRefreshToken);
    // console.log('[All Available Cookies after removing publicRefreshToken] : ', Update_Cookie_After_Removal_Public_Refresh_Token)

    // await context.clearCookies();
    await context.addCookies(Update_Cookie_After_Removal_Public_Refresh_Token);
    await this.setAllowBaCookies();

    await page.context().addCookies([
      { name: 'token', value: response.data.access_token, ...ecTokenCookie },
      { name: 'refreshtoken', value: response.data.refresh_token, ...ecTokenCookie },
      { name: 'loginType', value: user.type, ...addtionalECCookie },
      { name: 'execTier', value: user.tier, ...addtionalECCookie },
      { name: 'CORPORATE_BOOKING', value: `${user.isCorporate}`, ...addtionalECCookie },
    ]);
  }

  async signIn(ecMember) {

    let user = ExecutiveClubMemberHelper.userType[ecMember];

    await this.dismissCookieModal_SFD();

    // console.log('[Cookies accepted]');
    // console.log(`[Logging in as] : ${user.username}`);
    // console.log("[EC User Data] : ", JSON.stringify(user));

    const payload = {
      grant_type: 'password',
      username: user.username,
      password: user.password,
    };

    // Sending POST Request using Axios and qs

    const response = await axios.post('https://' + process.env.NODE_ENV + '/api/grant', qs.stringify(payload), {
      headers: {
        Authorization: `Client client_id="bacomng>prl"`,
        connection: 'keep-alive'
      },
      body: {
        grant_type: 'password',
        username: user.username,
        password: user.password,
      },
      form: true,
    });

    await this.cookieOption_ECLogin_SFD_Additional(response, user);

    // console.log("[EC LOGIN COMPLETE RESPONSE] : ", response);
    // console.log("[EC LOGIN RESPONSE Status Code] : ", response.status);
    // console.log("[EC LOGIN RESPONSE Headers]: ", response.headers);
    // console.log("[EC LOGIN RESPONSE Access Token] : ", response.data.access_token);
    // console.log("[EC LOGIN RESPONSE Refresh Token] : ", response.data.refresh_token);

    // console.log("ALL API CALLS Successfull")
  }

}
module.exports = bypassECLogin;