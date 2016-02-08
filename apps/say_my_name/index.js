var alexa = require('alexa-app');
var io;

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('saymyname');
app.launch(function(req,res) {
	//res.say("Let's start the color game!").shouldEndSession(false);
	res.say('<speak>Hi! my name is Alexa! what is your name?</speak>').shouldEndSession(false);
});

var responses = [
	"Its a nice day!",
	"Nice to meet you!",
	"Welcome!",
	"Shalom!",
	"I'm happy to be here!",
	"Bye Bye!"
]

app.intent('NameIntent', {
		"slots":{"NAMES":"LITERAL"}
		,"utterances":["My name is {matt|bob|bill|jake|nancy|mary|jane|NAMES}"]
	},function(req,res) {
		res.say('Hi ' + req.slot('NAMES') + "! My name is Alexa, " + responses[Math.floor(Math.random() * responses.length)]);
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
