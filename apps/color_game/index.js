var alexa = require('alexa-app');
var io;

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

var colorsArr = ["red","yellow","green","blue","black"];
var goodArr = ['Good Job!', 'nice!', 'very good!', 'perfect!'];
var badArr = ['Please try again', 'maybe next time', 'you can do better'];

// Define an alexa-app
var app = new alexa.app('colorgame');
app.launch(function(req, res) {
	res.say('Hi! My name is Alexa. What color do you see?').shouldEndSession(false);
	io.emit('start_game');
	color = colorsArr[Math.floor(Math.random() * colorsArr.length)];
	console.log(color);
	res.session('color', color);
	res.session('round', 1);
	io.emit('change_color', color, 1);
	/*
	setTimeout(function() {
		io.emit('change_color', color, 1);
	}, 0)
*/
});

app.sessionEnded(function(req,res) {
	res.say('Bye Bye!');
});

app.intent('ColorIntent', {
		"slots":{"color":"COLORS_SLOT"},
		"utterances":["{colors:COLORS_SLOT}"]
	},function(req,res) {
		var done = res.session('round') ==  3;
		console.log('round ' + res.session('round') + ' ' + res.session('color') + ' ' + req.slot('color'));
		if(res.session('color') === req.slot('color')) {
			//res.say('<audio src="https://s3.amazonaws.com/alexagamesmedia/correct.mp3"/>').shouldEndSession(done);
			res.say(goodArr[Math.floor(Math.random() * goodArr.length)]).shouldEndSession(done);
			io.emit('correct', res.session('round'));
		} else {
			res.say(badArr[Math.floor(Math.random() * badArr.length)]).shouldEndSession(done);
			io.emit('wrong', res.session('round'));
		}
		if (!done) {
			res.session('round', (res.session('round') + 1));
			color = colorsArr[Math.floor(Math.random() * colorsArr.length)];
			console.log('next color ' + color);
			res.session('color', color);
			io.emit('change_color', color, res.session('round'));
		} else {
			console.log('done');
		}
	}
);
	

app.game = function(req, res) {
	res.render('index');
}

app.media = function(req, res) {
	//console.log('@@@ media ' + req.query.id);
	res.sendFile('test.mp3', {root: './apps/color_game/media'});
}

app.io = function(server_io) {
	console.log(app.name + ' setio');
	io = server_io;
	io.on('connection', function(socket){
			console.log(app.name + ' io connect');
  	})
}

module.exports = app;
