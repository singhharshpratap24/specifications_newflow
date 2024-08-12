module.exports = {


    passengerdetails:{
    locate_drop_down_Adult_Mr : "//span[text()='Title']/../following-sibling::select",
    locate_first_name_Adult : "(//input[contains(@name,'-firstName')]).[i]",
    locate_last_name_Adult : "(//input[contains(@name,'-lastName')])[i]",
    locate_drop_down_YoungAdult_Mr : "(//span[text()='Title']/../following::select)[3]",
    locate_first_name_YoungAdult : "[id='pax1-firstName-safariSearch']",
    locate_last_name_YoungAdult : "[id='pax1-lastName-safariSearch']",
    locate_date_of_birth_YoungAdult_DD : "(//input[contains(@name,'dateOfBirth')])",
    locate_date_of_birth_YoungAdult_MM : "(//input[@placeholder='MM'])[1]",
    locate_date_of_birth_YoungAdult_YYYY : "(//input[@placeholder='YYYY'])[1]",
    locate_drop_down_Children_Mstr : "(//span[text()='Title']/../following::select)[5]",
    locate_first_name_Children : "[id='pax2-firstName-safariSearch']",
    locate_last_name_Children : "[id='pax2-lastName-safariSearch']",
    locate_date_of_birth_Children_DD : "(//input[@placeholder='DD'])[2]",
    locate_date_of_birth_Children_MM : "(//input[@placeholder='MM'])[2]",
    locate_date_of_birth_Children_YYYY : "(//input[@placeholder='YYYY'])[2]",
    locate_drop_down_Infant_Mstr : "(//span[text()='Title']/../following::select)[7]",
    locate_first_name_Infant : "[id='pax3-firstName-safariSearch']",
    locate_last_name_Infant : "[id='pax3-lastName-safariSearch']",
    locate_date_of_birth_Infant_DD : "(//input[@placeholder='DD'])[3]",
    locate_date_of_birth_Infant_MM : "(//input[@placeholder='MM'])[3]",
    locate_date_of_birth_Infant_YYYY : "(//input[@placeholder='YYYY'])[3]",
    locate_email_address : "//span[text()='Email address']/../following-sibling::input",
    locate_phone_number : "//span[text()='Phone number']/../following-sibling::input",
    locate_continue_button : "//*[@class='pax-continue button expand-full button-solid hydrated']",
    locate_disablity_assistance : "//a[text()='Disability assistance']",
    locate_passenger_error : "//*[contains(text(),'young adult should')]",
    locate_passenger_details_page:"//*[text()=' Passenger details ']"



    }
}