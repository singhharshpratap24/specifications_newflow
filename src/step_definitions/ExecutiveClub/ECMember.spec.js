const { When, Then, defineStep } = require('@cucumber/cucumber');
const ECMember_Account = require('../../page_objects/ExecutiveClub/ecmember/ecmember_account.page');
const ECPayment = require("../../page_objects/ExecutiveClub/ECPayment/ECPayment.page")

const obj_ecmemberaccount = new ECMember_Account();
const obj_ECPayment = new ECPayment();



defineStep("I see Book with Avios or money section",async function (){
  
    await obj_ecmemberaccount.isBookWithAviosOrmoneyDisplayed();

})

defineStep("following {string} are displayed on EC home page",async function (Options){
   await obj_ecmemberaccount.isCorrectOptionsDisplayed(Options);
})

defineStep("Member's Name, Avios and Tier Points are also displayed on EC home page",async function(){

   await obj_ecmemberaccount.isMembernameAviosandTierPointDisplayed();

})

defineStep("following {string} must appear", async function(details){
   obj_ECPayment.verifyPaymentChecks(details);
 });
