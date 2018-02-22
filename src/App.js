import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AnimateOnChange from 'react-animate-on-change'
const tarot_card_data = require('./data/tarot_card_assets');
const chaos_words = require('./data/chaos_words');
const replace_pct = 0.4
const card_back_image = './imgs/card-back.png'

var pos = require('pos');
var posTagger = new pos.Tagger();


var replace_text_random = function(orig_text, replace_word_list, pct_replace){
	var wordsArray = new pos.Lexer().lex(orig_text);
	var taggedWordsArray = posTagger.tag(wordsArray);
	//


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

	return taggedWordsArray.reduce(function(accumulator, curvalue){
		return /[A-Z]/.test(curvalue[1][0]) ? (accumulator += (' ' + curvalue[0])) : (accumulator += curvalue[0])
	},'')

}


class DeckLayout extends Component {
	render() {
		var num_cards = 35
		var cardWidthPct = 25
		console.log(this.props.cardsSelected)
		var cardDivs = Array(num_cards).fill().map((curval, i) => {
			return (
				<div style={{
						position: 'absolute',
						width: cardWidthPct + '%',
						height: 'auto',
						top: this.props.cardsSelected.includes(i) ? '-5px' : '0px',
						left: (i/(num_cards-1) * (100 - cardWidthPct) + '%'),
						zIndex: i}}
						onClick = {() => this.props.clickHandler(i)}
				>
					<img src={card_back_image}></img>
				</div>
			)
		})

		return (
			<div className="DeckLayout">
				{cardDivs}
			</div>
		)
	}
}

class TarotCardImage extends Component {
	constructor(props){
		super(props)
	}


	render() {
		var classText = "TarotCardImage"

		return (
			<div className={classText}>
				<div className="RotationContainer">

				  <div id="flip-card" className={(this.props.flipped ? 'flipped' : '')}>
				    <div className="front">
							<img src = {card_back_image} className = {this.props.orientation === 0 ? 'Rotated': ''}></img>
						</div>
				    <div className="back">
							<img src = {this.props.image_path} className = {this.props.orientation === 0 ? 'Rotated': ''}></img>
						</div>
				  </div>

					<div id="flip-card-spacer"></div>
				</div>
			</div>

		)
	}
}

class IntroTitle extends Component {
	render() {
		return (
			<div className="IntroTitle">
				{this.props.introText}
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
				<TarotCardImage
					orientation = {this.props.orientation}
					image_path = {this.props.image_path}
					flipped = {this.props.flipped}
				/>
			</div>
		)
	}
}


class App extends Component {
	handleSelectedCardClick(cardKey){

		var new_state = {
			cur_card_description: this.state.card_metadata[cardKey].card_description
		}

		if (!(this.state.card_metadata[cardKey].flipped)){
			new_state.card_metadata = this.state.card_metadata
			this.state.card_metadata[cardKey].flipped = true
		}

		this.setState(new_state)
	}

	handleDeckCardClick(cardIndex){
		console.log(this.state.cardsSelected)
		var pickedCardArray = this.state.cardsSelected
		if(!pickedCardArray.includes(cardIndex) && pickedCardArray.length < (3)){
			pickedCardArray.push(cardIndex)
		}

		this.setState({
			cardsSelected: pickedCardArray,
			finished_card_selection: pickedCardArray.length === 3 ? true : false
		})
	}

	constructor(props){
		super(props)

		var introTextArray = [
			"Welcome to spoooooky tarot - think carely about your past, and select a card",
			"Good, good, now think about your present and pick another card",
			"Almost there... think about the future carefuly, and select your last card"
		]

		var card_metadata = {
			"past": {
				orientation: Math.floor(Math.random() * 2),
				cardIndex: Math.floor(Math.random() * tarot_card_data.length),
				flipped: false
			},
			"present": {
				orientation: Math.floor(Math.random() * 2),
				cardIndex: Math.floor(Math.random() * tarot_card_data.length),
				flipped: false
			},
			"future": {
				orientation: Math.floor(Math.random() * 2),
				cardIndex: Math.floor(Math.random() * tarot_card_data.length),
				flipped: false
			}
		}

		for (var key in card_metadata){
			card_metadata[key].card_description = replace_text_random(tarot_card_data[card_metadata[key].cardIndex].description, chaos_words.word_map, replace_pct)
		}

		this.state = {
			finished_card_selection: false,
			cardsSelected: Array(0),
			cur_card_description: 'Click on a card to see your reading',
			card_metadata: card_metadata,
			introTextArray: introTextArray
		}
	}



  	render() {


		if (!this.state.finished_card_selection){
			return (
				<div className="App">
					<IntroTitle  introText={this.state.introTextArray[this.state.cardsSelected.length]} />
					<DeckLayout
						clickHandler = {(i) => this.handleDeckCardClick(i)}
						cardsSelected = {this.state.cardsSelected}
					/>
				</div>
			)
		}
		else {
			return (
				<div className="App">
					<div className="AllCardContainer">
						<TarotCardContainer
							key= "past"
							orientation = {this.state.card_metadata.past.orientation}
							cardTitle = "Past"
							image_path = {'./imgs/' + tarot_card_data[this.state.card_metadata.past.cardIndex].image_path}
							card_description = {replace_text_random(tarot_card_data[this.state.card_metadata.past.cardIndex].description, chaos_words.word_map, replace_pct)}
							flipped = {this.state.card_metadata.past.flipped}
							handleClick = {() => this.handleSelectedCardClick('past')}
						/>
						<TarotCardContainer
							key= "present"
							orientation = {this.state.card_metadata.present.orientation}
							cardTitle = "Present"
							image_path = {'./imgs/' + tarot_card_data[this.state.card_metadata.present.cardIndex].image_path}
							card_description = {replace_text_random(tarot_card_data[this.state.card_metadata.present.cardIndex].description, chaos_words.word_map, replace_pct)}
							flipped = {this.state.card_metadata.present.flipped}
							handleClick = {() => this.handleSelectedCardClick('present')}
						/>
						<TarotCardContainer
							key= "future"
							orientation = {this.state.card_metadata.future.orientation}
							cardTitle = "Future"
							image_path = {'./imgs/' + tarot_card_data[this.state.card_metadata.future.cardIndex].image_path}
							card_description = {replace_text_random(tarot_card_data[this.state.card_metadata.future.cardIndex].description, chaos_words.word_map, replace_pct)}
							flipped = {this.state.card_metadata.future.flipped}
							handleClick = {() => this.handleSelectedCardClick('future')}
						/>
					</div>
					 <AnimateOnChange
					 	baseClassName="TarotCardDescription"
					 	animationClassName="fadeIn"
					 	animate={true}>
							<TarotCardDescription card_description = {this.state.cur_card_description} />
					 </AnimateOnChange>
				</div>
	    )
		}
  }
}
// <TarotCardDescription card_description = {this.state.cur_card_description} />


export default App;
