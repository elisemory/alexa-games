var alexa = require('alexa-app');
var io;

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

var colorsArr = ["red","yellow","green","white","blue","black"];

// Define an alexa-app
var app = new alexa.app('colorgame');
app.launch(function(req,res) {
	res.say('<speak>Hi! My name is Alexa. What color do you see?</speak>').shouldEndSession(false);
	io.emit('start_game');
	color = colorsArr[Math.floor(Math.random() * colorsArr.length)];
	res.session('color', color);
	res.session('score', 0);
	io.emit('change_color', color);
});

app.intent('ColorIntent', {
		"slots":{"color":"COLORS_SLOT"},
		"utterances":["{colors:COLORS_SLOT}"]
	},function(req,res) {
		console.log(res.session('color') + ' ' + req.slot('color'));
		if(res.session('color') === req.slot('color')) {
			res.session('score', (res.session('score') + 1));
			console.log('score: ' + res.session('score'));
			res.say('<audio src="https://s3.amazonaws.com/alexagamesmedia/correct.mp3"/>')
		} else {
			console.log("BAD");
		}
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

module.exports = app;
