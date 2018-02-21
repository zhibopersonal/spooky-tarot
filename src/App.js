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
		var card_description_array = this.props.card_description.split('@@br@@')
		var card_description_paragraphs = card_description_array.map(function(elem){
			return <p> {elem} </p>
		})
		console.log(card_description_paragraphs)
		return (
			card_description_paragraphs
		)
	}
}


class TarotCardContainer extends Component
{
	render() {
		return (
			<div className="TarotCardContainer" onClick={this.props.handleClick} >
				<div className="TarotCardTitle">{this.props.cardTitle}</div>
				<TarotCardImage orientation = {this.props.orientation} image_path = {this.props.image_path} />
			</div>
		)
	}
}

class App extends Component {
	handleCardClick(cardKey){
		console.log("asdfasfd")
		this.setState({cur_card_description: this.state.card_metadata[cardKey].card_description})
	}

	constructor(props){
		super(props)

		var card_metadata = {
			"past": {
				orientation: Math.floor(Math.random() * 2),
				cardIndex: Math.floor(Math.random() * tarot_card_data.length)
			},
			"present": {
				orientation: Math.floor(Math.random() * 2),
				cardIndex: Math.floor(Math.random() * tarot_card_data.length)
			},
			"future": {
				orientation: Math.floor(Math.random() * 2),
				cardIndex: Math.floor(Math.random() * tarot_card_data.length)
			}
		}

		for (var key in card_metadata){
			card_metadata[key].card_description = replace_text_random(tarot_card_data[card_metadata[key].cardIndex].description, chaos_words.word_map, replace_pct)
		}

		this.state = {
			cur_card_description: 'asdfasfdsa',
			card_metadata: card_metadata
		}
	}



  	render() {

		return (
		<div className="App">
			<div className="AllCardContainer">
				<TarotCardContainer
					key= "past"
					orientation = {this.state.card_metadata.past.orientation}
					cardTitle = "Past"
					image_path = {'./imgs/' + tarot_card_data[this.state.card_metadata.past.cardIndex].image_path}
					card_description = {replace_text_random(tarot_card_data[this.state.card_metadata.past.cardIndex].description, chaos_words.word_map, replace_pct)}
					handleClick = {() => this.handleCardClick('past')}
				/>
				<TarotCardContainer
					key= "present"
					orientation = {this.state.card_metadata.present.orientation}
					cardTitle = "Present"
					image_path = {'./imgs/' + tarot_card_data[this.state.card_metadata.present.cardIndex].image_path}
					card_description = {replace_text_random(tarot_card_data[this.state.card_metadata.present.cardIndex].description, chaos_words.word_map, replace_pct)}
					handleClick = {() => this.handleCardClick('present')}
				/>
				<TarotCardContainer
					key= "future"
					orientation = {this.state.card_metadata.future.orientation}
					cardTitle = "Future"
					image_path = {'./imgs/' + tarot_card_data[this.state.card_metadata.future.cardIndex].image_path}
					card_description = {replace_text_random(tarot_card_data[this.state.card_metadata.future.cardIndex].description, chaos_words.word_map, replace_pct)}
					handleClick = {() => this.handleCardClick('future')}
				/>
			</div>
			<div className="TarotCardDescription">
				<TarotCardDescription card_description = {this.state.cur_card_description} />
			</div>
		</div>
    )
  }
}

export default App;
