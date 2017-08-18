'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.loginUser = (email, password) => 

	new Promise((resolve,reject) => {

		user.find({email: email})

		.then(users => {

			if (users.length == 0) {

				reject({ status: 404, message: 'User Not Found !' });

			} else {

				return users[0];
				
			}
		})

		.then(user => {

			const hashed_password = user.hashed_password;

			if (bcrypt.compareSync(password, hashed_password)) {

				resolve({ status: 200, message: email });

			} else {

				reject({ status: 401, message: 'Invalid Credentials !' });
			}
		})

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

});


//exports.getAllCorrectedUsersFromTable = (name) =>

	//new Promise((resolve,reject) => {


        //db.users.find({"name": /.*m.*/})

        //db.users.find({"name": /m/})

		//user.find({"name": /name/})

        //user.find({ name: /.*name.*/i })

		/*.then(users => resolve(users))

	    .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

}); */

exports.getAllCorrectedUsersFromTable = function(name, callback) {
//exports.getAllCorrectedUsersFromTable = (name) =>

	 //new Promise((resolve,reject) => {

	 //user.find({ name: /.*name.*/i })

	 //.then(users => resolve(users))

	 //.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	user.find({name: new RegExp(name, 'i')}, function(err, users){

		if(users.length != 0){

			callback({ users: (users) });
		}else {
			callback({ err: 500, message: 'Internal Server Error !' });
		}
	});

};


exports.deleteUserFromTable = function(name, callback) {

	user.remove( { name: name }, function(err, records){
        if(err){
            console.log("Error" + err);
        }
        else{
            console.log("User " + name + " was removed.");
        }
    });

    user.find( {}, function(err, users){

        if(users.length != 0){

            callback({ users: (users) });
        }else {
            callback({ err: 500, message: 'Internal Server Error !' });
        }
    });
};


exports.updateUserInTable = (name, email) =>

    new Promise((resolve, reject) => {

        user.find({ email: email })

        .then(users => {

            let user = users[0];

            if (user.email == email) {

                user.name = name;

                return user.save();

            } else {

                reject({ status: 401, message: 'This name already exists in database!' });
            }
        })

        .then(user => resolve({ status: 200, message: 'Name of user succesufully changed !' }))

        .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

});


exports.getAllUsersFromDatabase = (pass) =>

	new Promise((resolve,reject) => {

		user.find()

		.then(users => resolve(users))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

});

exports.getDataFromUser = (email) =>

	new Promise((resolve,reject) => {

		user.find({email: email})

		.then(users => {

			if (users.length == 0) {

				reject({ status: 404, message: 'User Not Found !' });

			} else {

				//return users[0];
    			//resolve({ status: 200, message: users[0] });
			    resolve(users[0])
			}
		})

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

});

	
