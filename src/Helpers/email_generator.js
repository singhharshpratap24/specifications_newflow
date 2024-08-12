const LOGGER = require('../../src/setup/logger.js');

class EmailGenerator {

    async generateEmail() {

    const characters ='0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz.';
    const length=Math.floor(Math.random() * 25);
    let result = 'Test'; //to have min length for the generated email
    for ( let i = 0; i < length; i++ ) {
        result =result.concat(characters.charAt(Math.floor(Math.random() * 25)));
    }
    const dynamicEmail = result.substring(0) + '@ba.com';
    console.log('Dynamic Email : '+dynamicEmail);
    LOGGER.info('Dynamic Email : '+dynamicEmail, { classname: 'EmailGenerator'});
    return dynamicEmail;
    }
}
module.exports = EmailGenerator