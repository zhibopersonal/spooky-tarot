var word_map = {
	"NN":[
		"fart",
		"butt crack",
		"dick",
		"poop",
		"dingus"
	],
	"NNS":[
		"farts",
		"butt cracks",
		"dicks",
		"poops",
		"dinguses"
	],
	"VB":[
		"fuck",
		"cum",
		"diddle"
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
