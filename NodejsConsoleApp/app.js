var express = require('express');
var app = express();

var Authorize = function (req, res, next) {
	req.auth = req.get("Authorization");
	req.requestTime = Date.now();
	//next();

	res.statusCode = 401;
	// MyRealmName can be changed to anything, will be prompted to the user
	res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
	// this will displayed in the browser when authorization is cancelled
	res.end('Unauthorized');
};

//var auth = express.basicAuth(function (user, pass, callback) {
//	var result = (user === 'testUser' && pass === 'testPass');
//	callback(null /* error */, result);
//});

//app.use(requestTime);

app.get('/route1', Authorize, function (req, res) {
	var responseText = 'Hello World! Authorize<br>';
	responseText += '<small>Requested at: ' + req.requestTime + '</small>';
	responseText += '<small>Auth at: ' + req.auth + '</small>';
	res.send(responseText);
});

app.get('/route2', function (req, res) {
	var responseText = 'Hello World!<br>';
	responseText += '<small>Requested at: ' + req.requestTime + '</small>';
	responseText += '<small>Auth at: ' + req.auth + '</small>';
	res.send(responseText);
});

app.listen(3000);
