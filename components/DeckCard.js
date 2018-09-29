import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { gray, black } from '../utils/colors'
import { styles } from '../utils/styles'


export default class DeckCard extends Component {
	render () {
		const { name, total_cards, navigation } = this.props
		return (
			<TouchableOpacity 
				style={styles.deck}
				onPress={() => navigation.navigate('Deck', { deckTitle: name })}
			>
				<Text style={{fontSize: 20, textAlign: 'center'}}>{name}</Text>
				<Text style={{fontSize: 15, textAlign: 'center', color: gray}}>{total_cards} {total_cards === 1 ? 'card': 'cards'}</Text>
			</TouchableOpacity>
		)
	}
}


