'use strict';

class EmailHelper {

    /**
     * @param  {} callback
     */
    getNewEmail() {
        return new Promise(
            (resolve, reject) => {
                try {
                    let userName = 'test' + Date.now();
                    let newEmail = userName + '@putsbox.com';
                    console.log(newEmail);
                    resolve(newEmail);

                } catch (error) {
                    reject('Not able to get new temporary email: ' + error);
                }
            });
    }

    getEmailConfirmationLink(email) {
        return new Promise(
            (resolve, reject) => {
                let userName = email.split('@')[0];
                resolve(`http://preview.putsbox.com/p/${userName}/last`);
            });
    }
}
module.exports = new EmailHelper();