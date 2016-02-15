var alexa = require('alexa-app');
var io;

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

var wordsArr = ["red","yellow","green","blue","black"];
var goodArr = ['Good Job!', 'nice!', 'very good!', 'perfect!'];
var badArr = ['Please try again', 'maybe next time', 'you can do better'];

// Define an alexa-app
var app = new alexa.app('wordsgame');
app.launch(function(req, res) {
	res.say('Hi! My name is Alexa. What image do you see?').shouldEndSession(false);
	io.emit('start_game');
	word = wordsArr[Math.floor(Math.random() * wordsArr.length)];
	console.log(word);
	res.session('word', word);
	res.session('round', 1);
	io.emit('change_word', word, 1);
});

app.sessionEnded(function(req,res) {
	res.say('Bye Bye!');
});

app.intent('WordIntent', {
		"slots":{"word":"WORDS_SLOT"},
		"utterances":["{words:WORDS_SLOT}"]
	},function(req,res) {
		var done = res.session('round') ==  3;
		console.log('round ' + res.session('round') + ' ' + res.session('word') + ' ' + req.slot('word'));
		if(res.session('word') === req.slot('word')) {
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
			console.log('next word ' + word);
			res.session('word', word);
			io.emit('change_word', color, res.session('round'));
		} else {
			console.log('done');
		}
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
  	})
}

module.exports = app;
