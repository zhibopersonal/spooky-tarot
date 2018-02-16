import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const tarot_card_data = require('./data/tarot_card_assets');
const chaos_words = require('./data/chaos_words');

var replace_text_random = function(orig_text, replace_word_list, pct_replace){
	var orig_text_array = orig_text.split(' ')
	var i
	var orig_text_rand_index
	var replace_word_rand_index
	var max_replace_words = Math.floor(orig_text_array.length * pct_replace)

	for (i = 0; i < max_replace_words; i++) {
		orig_text_rand_index = Math.floor(Math.random() * orig_text_array.length)
		replace_word_rand_index = Math.floor(Math.random() * replace_word_list.length)

    	orig_text_array[orig_text_rand_index] = replace_word_list[replace_word_rand_index]
	}

	return orig_text_array.join(' ')

}

class TarotCard extends Component {
	constructor(props){
		super(props)
		console.log(this.props)
	}

	render() {
		return (
			<div className="TarotCard">
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
				{this.props.card_description}>
			</div>
		)
	}
}

class App extends Component {

  	render() {
		var randomCardIndex = Math.floor(Math.random() * tarot_card_data.length)
    return (
		<div>
			<TarotCard image_path = {'./imgs/' + tarot_card_data[randomCardIndex].image_path} />
			<TarotCardDescription card_description = {replace_text_random(tarot_card_data[randomCardIndex].description, chaos_words, 0.1)} />
		</div>
    );
  }
}

export default App;
