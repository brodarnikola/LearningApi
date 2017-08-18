/**
 * Created by BrcNidzo on 25.1.2017..
 */

'use strict';

const user = require('../models/user');

// Update Genre
module.exports.calculateTwoNumbers = function(firstNumber, secondNumber, options, callback){

    var resulT = firstNumber + secondNumber;

    return resulT;

    //callback({resulT: resulT});

    /*user.find( {}, function(err, users){

        if(users.length != 0){

            callback({ users: (users) });
        }else {
            callback({ err: 500, message: 'Internal Server Error !' });
        }
    }); */

}
