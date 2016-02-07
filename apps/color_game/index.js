var alexa = require('alexa-app');

var io;

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('colorgame');
app.launch(function(req,res) {
	res.say("Hello World!!").shouldEndSession(false);
});
app.intent('NameIntent', {
		"slots":{"NAME":"LITERAL","AGE":"NUMBER"}
		,"utterances":["{My name is|my name's} {matt|bob|bill|jake|nancy|mary|jane|NAME} and I am {1-100|AGE}{ years old|}"]
	},function(req,res) {
		res.say('Your name is '+req.slot('NAME')+' and you are '+req.slot('AGE')+' years old');
	}
);
app.intent('AgeIntent', {
		"slots":{"AGE":"NUMBER"}
		,"utterances":["My age is {1-100|AGE}"]
	},function(req,res) {
		res.say('Your age is '+req.slot('AGE'));
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
			io.emit('chat message', app.name);
  	})
}

module.exports = app;
