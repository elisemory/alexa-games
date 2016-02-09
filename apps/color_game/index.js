var alexa = require('alexa-app');
var io;

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('colorgame');
app.launch(function(req,res) {
	//res.say("Let's start the color game!").shouldEndSession(false);
 	io.emit('start_game');
	res.say('<speak>Hi! My name is Alexa. What color do you see?</speak>')
});

var colorsArr = ["red","yellow","green","white","blue","black"];

app.intent('ColorIntent', {
		"slots":{"color":"COLORS_SLOT"}
		,"utterances":["Change color to {colors:COLOR}"]
	},function(req,res) {
		res.say('The color is ' + req.slot('color')).shouldEndSession(false);
	}
);

app.game = function(req, res) {
	res.render('index');
}

app.media = function(req, res) {
	console.log('@@@ media ' + req.query.id);
	res.sendFile('test.mp3', {root: './apps/color_game/media'});
}

app.io = function(server_io) {
	console.log(app.name + ' setio');
	io = server_io;
	io.on('connection', function(socket){
			console.log(app.name + ' io connect');
			io.emit('change_color', 'white');
  	})
}

/*
setInterval(function(){
	if (io) {
		var color = colorsArr[Math.floor(Math.random() * colorsArr.length)];
		console.log(color)
		io.emit('change_color', color);
	}
}, 2000)
*/

module.exports = app;
