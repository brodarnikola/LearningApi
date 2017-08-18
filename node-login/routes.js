'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('./functions/register');
const login = require('./functions/login');
const profile = require('./functions/profile');
const password = require('./functions/password');
const config = require('./config/config.json');


const newStuff = require('./functions/newStuff');

//module.exports = function (router2) {

    //router2.post('users/allCorectedUsers', function(req,res) {

        //if (checkToken(req)) {

		/*var test3 = req.body.email;
		 var test2 = req.email;

		 const credentials = auth(req);

		 login.getAllCorrectedUsersFromTable(credentials.name)

		 .then(result => res.json(result))

		 .catch(err => res.status(err.status).json({ message: err.message })); */

        /*var name2 = req.body.name;
        var name3 = req.name;
        var password = req.body.password;

        //const credentials = auth(req);

        login.getAllCorrectedUsersFromTable(name2, function (found) {
            console.log(found);
            res.json(found);
        }); */

		/*} else {

		 res.status(401).json({ message: 'Invalid Token !' });
		 }*/
    //});
//};

module.exports = router => {

	router.get('/', (req, res) => res.end('Welcome to Learn2Crack !'));

	router.post('/authenticate', (req, res) => {

		const credentials = auth(req);

		if (!credentials) {

			res.status(400).json({ message: 'Invalid Request !' });

		} else {

			login.loginUser(credentials.name, credentials.pass)

			.then(result => {

				const token = jwt.sign(result, config.secret, { expiresIn: 1440 });

				res.status(result.status).json({ message: result.message, token: token });

			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

    router.post('/authenticateNumber2', (req, res) => {

		const credentials = auth(req);
		//const credentials = req.body.email;

		if (!credentials) {

			res.status(400).json({ message: 'Invalid Request !' });

		} else {

			login.getDataFromUser(credentials.name)

			.then(result => {

				//const token = jwt.sign(result, config.secret, { expiresIn: 1440 });

				//res.status(result.status).json({ message: result.message, token: token });
                res.json(result)
			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

    router.post('/users/allCorectedUsers', function(req,res) {

        /*const credentials = auth(req);

		login.getAllCorrectedUsersFromTable(credentials.name)

		.then(result => res.json(result))

		.catch(err => res.status(err.status).json({ message: err.message })); */


        var name = req.body.name;
		var email = req.body.email;

		login.getAllCorrectedUsersFromTable(name, function (found) {
			console.log(found);
			res.json(found);
		});

	});

    router.delete('/users/deleteCorrectUser', function(req,res) {

		/*const credentials = auth(req);

		 login.getAllCorrectedUsersFromTable(credentials.name)

		 .then(result => res.json(result))

		 .catch(err => res.status(err.status).json({ message: err.message })); */


        var name = req.body.name;
        var email = req.body.email;

        login.deleteUserFromTable(name, function (found) {
            console.log(found);
            res.json(found);
        });

    });


    router.post('/users/updateOneUser', function(req,res) {

		/*const credentials = auth(req);

		 login.getAllCorrectedUsersFromTable(credentials.name)

		 .then(result => res.json(result))

		 .catch(err => res.status(err.status).json({ message: err.message })); */

        var name = req.body.name;
        var email = req.body.email;

        login.updateUserInTable(name, email)

        //    .then(result => res.status(result.status).json({ message: result.message }))
		.then(result => res.json(result))

        .catch(err => res.status(err.status).json({ message: err.message }));

        /*var name = req.body.name;
        var email = req.body.email;

        login.updateUserInTable(name, email, function (found) {
            console.log(found);
            res.json(found);
        }); */

    });

	router.post('/users', (req, res) => {

		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;

		if (!name || !email || !password || !name.trim() || !email.trim() || !password.trim()) {

			res.status(400).json({message: 'Invalid Request !'});

		} else {

			register.registerUser(name, email, password)

			.then(result => {

				res.setHeader('Location', '/users/'+email);
				res.status(result.status).json({ message: result.message })
			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	router.get('/users/:id', (req,res) => {

		if (checkToken(req)) {

			profile.getProfile(req.params.id)

			.then(result => res.json(result))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

    // find all users in database (node-login)
	router.get('/allusers', (req,res) => {

          login.getAllUsersFromDatabase()

    	  .then(result => res.json(result))

          .catch(err => res.status(err.status).json({ message: err.message }));
    });

	router.put('/users/:id', (req,res) => {

		if (checkToken(req)) {

			const oldPassword = req.body.password;
			const newPassword = req.body.newPassword;

			if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {

				res.status(400).json({ message: 'Invalid Request !' });

			} else {

				password.changePassword(req.params.id, oldPassword, newPassword)

				.then(result => res.status(result.status).json({ message: result.message }))

				.catch(err => res.status(err.status).json({ message: err.message }));

			}
		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

	router.post('/users/:id/password', (req,res) => {

		const email = req.params.id;
		const token = req.body.token;
		const newPassword = req.body.password;

		if (!token || !newPassword || !token.trim() || !newPassword.trim()) {

			password.resetPasswordInit(email)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			password.resetPasswordFinish(email, token, newPassword)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

    router.post('/users/calculateTwoNumbers/:firstNumber/:secondNumber',   function(req,res) {

        //const firstNumber = req.params.firstNumber;
		//const secondNumber = req.body.secondNumber;

		var firstNumber = req.params.firstNumber;
    	var secondNumber = req.params.secondNumber;

    	var result = parseInt(firstNumber) + parseInt(secondNumber);
    	console.log( { message: "rezultat tih brojeva je: " + result });
    	res.json({ message: result });


		//res.json(result);



		/*const credentials = auth(req);

		 login.getAllCorrectedUsersFromTable(credentials.name)

		 .then(result => res.json(result))

		 .catch(err => res.status(err.status).json({ message: err.message })); */


		/*newStuff.calculateTwoNumbers(firstNumber, secondNumber, function(found){
			if(found){
				throw found;
			}
            console.log(found);
			res.json(found);
		}); */


	});

	function checkToken(req) {

		const token = req.headers['x-access-token'];

		if (token) {

			try {

  				var decoded = jwt.verify(token, config.secret);

  				return decoded.message === req.params.id;

			} catch(err) {

				return false;
			}

		} else {

			return false;
		}
	}


}