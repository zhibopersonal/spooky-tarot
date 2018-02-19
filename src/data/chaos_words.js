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

module.exports = {word_map:word_map, available_pos:available_pos}
