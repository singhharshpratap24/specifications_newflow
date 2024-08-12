module.exports = {
    ECLogin: {
        locate_homepage_log_in: ["#loginLinkDesktop > span", "//span[contains(text(),'Log in')][1]"],
        locate_logOut: ["//*[contains(text(),'Log out')]", "#logoutLinkDesktop > span"],
        locate_username: "#username",
        locate_password: "#password",
        locate_login_button: "//*[contains(text(),'Continue')]",
        locate_my_account_page: "(//a[contains(text(),'My Account')])[1]",
        locate_ec_member_name: ".member-name .login",
        locate_ec_member_icon: ".member-name .icon-wrapper",
        locate_manage_my_booking: "(//*[contains(text(),'Manage')])[1]",
        locate_executiveClub_link: "//a[contains(text(),' Executive Club ')]",
        locate_myAccount_linkText: ".account-panel-barc ba-link .link",
        locate_ec_homepage_welcome_banner: "(//*[contains(text(),'Welcome')])[1]",
        locate_EC_Account_Page_title: "head > title",
        locate_Captcha: "div#anchor",
    }
}