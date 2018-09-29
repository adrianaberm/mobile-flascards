import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Button, StyleSheet } from 'react-native'
import DefaultBtn from './DefaultBtn'
import { white, black, pink, lightgray } from '../utils/colors'
import { styles } from '../utils/styles'
class Deck extends Component {

	render () {
		const { deck, navigation } = this.props
		return (
			<View style={styles.deckContainer}>
				<View>
					<Text style={{fontSize: 30, marginBottom: 5, textAlign: 'center'}}>{deck.title}</Text>
					<Text style={{fontSize: 20, color: black}}>{deck.questions.length} {deck.questions.length === 1 ? 'card': 'cards'} Available</Text>
				</View>
				<View>
					<DefaultBtn
					onPress={() => navigation.navigate('AddCard', { deckTitle: deck.title })}
					style={{backgroundColor: lightgray, borderColor: pink, marginTop: 50}}
					textStyle={{color: pink}}
					>
					Add Card
					</DefaultBtn>
					{deck.questions.length>0 &&
						<DefaultBtn
						onPress={() => navigation.navigate('Card', { deckTitle: deck.title })}
						style={{backgroundColor: pink, borderColor: pink, marginTop: 20}}
						textStyle={{color: white}}
						>
						Start Quiz
						</DefaultBtn>
					}
				</View>
			</View>
			)
		}
	}


function mapStateToProps (state, { navigation }) {
	const { deckTitle } = navigation.state.params
	return {
		deckTitle,
		deck: state[deckTitle]
	}
}

export default connect(mapStateToProps)(Deck)