import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const tarot_card_data = require('./data/tarot_card_assets');
const chaos_words = require('./data/chaos_words');
const replace_pct = 0.1

var pos = require('pos');
var posTagger = new pos.Tagger();


var replace_text_random = function(orig_text, replace_word_list, pct_replace){
	var wordsArray = new pos.Lexer().lex(orig_text);
	var taggedWordsArray = posTagger.tag(wordsArray);
	console.log(taggedWordsArray)

	var orig_text_array = orig_text.split(' ')
	var i
	var orig_text_rand_index
	var replace_word_rand_index
	var max_replace_words = Math.floor(orig_text_array.length * pct_replace)
	var curPOS = ''

	for (i = 0; i < max_replace_words; i++) {
		orig_text_rand_index = Math.floor(Math.random() * taggedWordsArray.length)
		curPOS = taggedWordsArray[orig_text_rand_index][1]

		if (chaos_words.available_pos.includes(curPOS)){
			replace_word_rand_index = Math.floor(Math.random() * replace_word_list[curPOS].length)
			taggedWordsArray[orig_text_rand_index][0] = replace_word_list[curPOS][replace_word_rand_index]
		}
	}

	return taggedWordsArray.map(function(curElement){
		return curElement[0]
	}).join(' ')

}



class TarotCardImage extends Component {
	constructor(props){
		super(props)
	}

	render() {
		var classText = "TarotCardImage"
		if (this.props.orientation == 0) {
			classText += " Rotated"
		}

		return (
			<div className={classText}>
				<img src = {this.props.image_path}></img>
			</div>
		)
	}
}

class TarotCardDescription extends Component {
	constructor(props){
		super(props)
	}

	render() {
		return (
			<div className="TarotCardDescription">
				{this.props.card_description}
			</div>
		)
	}
}


class TarotCardContainer extends Component
{
	render() {
		return (
			<div className="TarotCardContainer">
				<div className="TarotCardTitle">{this.props.cardTitle}</div>
				<TarotCardImage orientation = {this.props.orientation} image_path = {this.props.image_path} />
				<TarotCardDescription card_description = {this.props.card_description} />
			</div>
		)
	}
}

class App extends Component {

  	render() {
		var randomCardIndex1 = Math.floor(Math.random() * tarot_card_data.length)
		var randomCardIndex2 = Math.floor(Math.random() * tarot_card_data.length)
		var randomCardIndex3 = Math.floor(Math.random() * tarot_card_data.length)
    return (
		<div class="App">
			<TarotCardContainer orientation = {Math.floor(Math.random() * 2)} cardTitle = "Past" image_path = {'./imgs/' + tarot_card_data[randomCardIndex1].image_path} card_description = {replace_text_random(tarot_card_data[randomCardIndex1].description, chaos_words.word_map, replace_pct)}/>
			<TarotCardContainer orientation = {Math.floor(Math.random() * 2)} cardTitle = "Present" image_path = {'./imgs/' + tarot_card_data[randomCardIndex2].image_path} card_description = {replace_text_random(tarot_card_data[randomCardIndex2].description, chaos_words.word_map, replace_pct)}/>
			<TarotCardContainer orientation = {Math.floor(Math.random() * 2)} cardTitle = "Future" image_path = {'./imgs/' + tarot_card_data[randomCardIndex3].image_path} card_description = {replace_text_random(tarot_card_data[randomCardIndex3].description, chaos_words.word_map, replace_pct)}/>
		</div>
    );
  }
}

export default App;
