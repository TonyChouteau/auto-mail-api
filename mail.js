const fs = require("fs");

let mandrill;
fs.readFile("./api.key", 'utf8', (err, key) => {
	if (err) return;
	console.log("\nMailChimp API key :", key)
	mandrill = require('node-mandrill')(key);
})

module.exports = function( _name, _email, _subject, _message, successCallback, errorCallback) {
    mandrill('/messages/send', {
        message: {
            to: [{email: _email , name: _name}],
            from_email: 'contact@tonychouteau.fr',
            subject: _subject,
            text: _message
        }
    }, function(error, response){
        if (error) {
			errorCallback(error);
		} else {
			successCallback(response);
			
		}
    });
}