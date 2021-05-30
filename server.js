const express = require("express");
const bodyParser = require('body-parser');

const mail = require('./mail');

const PORT = 8092;
const app = express();
var router = express.Router();

router.use(function(_, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Origin, X-Requested-With, Content-Type, Accept");
	next();
});

router.use(express.json());

// define your own email api which points to your server.
router.post( '/mail/', function(req, res){

    let _name = req.body.name;
    let _email = req.body.email;
    let _subject = req.body.subject;
    let _message = req.body.message;

	console.log(req.body);

    //implement your spam protection or checks. 
    mail( _name, _email, _subject, _message, (result) => {
		res.status(201).json(result);
	}, (error) => {
		res.status(501).json(error);
	});
});

app.use('/', router);

app.listen(PORT, function () {
	console.log("App listening on port "+PORT+"!");
});
