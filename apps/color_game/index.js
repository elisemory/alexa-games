var alexa = require('alexa-app');
var io;

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('colorgame');
app.launch(function(req,res) {
	res.say("Welcome! <audio src='http://www.stephaniequinn.com/Music/Allegro%20from%20Duet%20in%20C%20Major.mp3' />").shouldEndSession(false);
});

var colorsArr = ["red","yellow","green","white","blue","black"];

app.intent('ColorIntent', {
		"slots":{"color":"COLORS"}
		,"utterances":["Change color to {colors:COLOR}"]
	},function(req,res) {
		res.say('The color is ' + req.slot('color')).shouldEndSession(false);
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

setInterval(function(){
	if (io) {
		var color = colorsArr[Math.floor(Math.random() * colorsArr.length)];
		console.log(color)
		io.emit('change_color', color);
	}
}, 2000)

module.exports = app;
