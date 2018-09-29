import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { white, black, pink } from '../utils/colors'
import { styles } from '../utils/styles'
import DeckCard from './DeckCard'

class DeckList extends Component {
	componentDidMount() {
		const { dispatch } = this.props
		getDecks()
		.then((decks) => dispatch(receiveDecks(decks)))
	}
	render () {
		const { decks, navigation } = this.props
		const flatDecks = Object.keys(decks).map(key => decks[key])
		if(this.props.decks !== undefined && this.props.decks.length > 0){
			return (
				<View>
					<Text style= {{textAlign: center, paddingTop: 20}}>
						There are no Categories to display. Please add one.
					</Text>
				</View>
				)
		}
		else {
			return (
				<View 
				style={{backgroundColor: white, paddingBottom: 50}}>
					<Text	style={[styles.description]}>
						Select a category to start playing.
					</Text>
				<ScrollView>
					{Object.keys(decks).map((key) =>{
						const value = decks[key]
						return (
							<DeckCard key={key}
								name={value.title}
								total_cards={value.questions.length}
								navigation={navigation}
							/>)
						})}
					</ScrollView>	
				</View>

					)
				}
			}
		}

function mapStateToProps (decks) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(DeckList)