var AlexaAppServer = require('alexa-app-server');
var port = process.env.PORT || 3000

AlexaAppServer.start({
	//httpsPort:4000,
	port:port,
	//httpsEnabled:true,
	//privateKey:'private-key.pem',
	//certificate:'cert.cer'
	}
);
