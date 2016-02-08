var alexa = require('alexa-app');
var io;

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('saymyname');
app.launch(function(req,res) {
	//res.say("Let's start the color game!").shouldEndSession(false);
	res.say('<speak>Hi! my name is Alexa! what is your name?</speak>')
});

app.intent('NameIntent', {
		"slots":{"name":"LITERAL"}
		,"utterances":["My name is {NAME}"]
	},function(req,res) {
		res.say('Hi ' + req.slot('name') + "! My name is Alexa, nice to meet you!");
	}
);

app.game = function(req, res) {
	res.render('index');
}

app.io = function(server_io) {
	console.log(app.name + ' setio');
	io = server_io;
	io.on('connection', function(socket){
			console.log(app.name + ' io connect');
			io.emit('change_color', 'blue');
  	})
}

module.exports = app;
