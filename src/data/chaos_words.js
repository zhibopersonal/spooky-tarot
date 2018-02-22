var word_map = {
	"NN":[
		"fart",
		"butt crack",
		"dick",
		"poop",
		"dingus",
		"pee",
		"butt",
		"noun",
		"boob",
		"hepatits"
	],
	"NNS":[
		"farts",
		"butt cracks",
		"dicks",
		"poops",
		"dinguses",
		"butts",
		"boobs"
	],
	"VB":[
		"fuck",
		"cum",
		"diddle",
		"tickle"
	],
	"VBD":[
		"fucked",
		"came",
		"diddled"
	],
	"VBG":[
		"fucking",
		"coming",
		"diddling"
	],
	"VBN":[
		"eaten",
		"pooped",
		"diddled"
	],
	"VBP":[
		"fuck",
		"cum",
		"diddle"
	],
	"VBZ":[
		"fucks",
		"cums",
		"diddles"
	]
}

var available_pos = []
var k
for (k in word_map){
	available_pos.push(k)
}

var do_not_replace_words = [
	'is','was','be','been',
	'have','had','has'
]

module.exports = {word_map:word_map, available_pos:available_pos, do_not_replace_words:do_not_replace_words}
