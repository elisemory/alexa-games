var AlexaAppServer = require('alexa-app-server');
var port = process.env.PORT || 3000

var appServer = AlexaAppServer.start({
		port:port
	}
);
