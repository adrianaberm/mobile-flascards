import React, { Component } from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView, View, Text, TextInput, StyleSheet } from 'react-native'
import DefaultBtn from './DefaultBtn'
import { white, black, pink } from '../utils/colors'
import { styles } from '../utils/styles'
import { addCard } from '../actions/'
class AddCard extends Component {
	static navigationOptions = ({ navigation }) => {
		const { deckTitle } = navigation.state.params
		return {
			title: `Add Card in ${deckTitle}`
		}
	}
	state = {
		question: null,
		answer: null,
		error:  null,
	}
	handleSubmit = () => {
		const { deckTitle, navigation } = this.props
		if ((this.state.question===null) || (this.state.answer===null)) {
			this.setState({error: 'Both fields are required.'})
		} else {
			const card = {
				question: this.state.question,
				answer: this.state.answer,
				error: null,
			}
			this.props.dispatch(addCard(deckTitle, card))
			navigation.goBack()
		}
	}
	render () {
		const { question, answer } = this.state
		return (

			<KeyboardAvoidingView style={styles.deckContainer} behavior="padding" enabled>
				<View >

					<TextInput
						placeholder='Add a Question'
						style={styles.inputField} 
						maxLength={60}
						value={this.state.question}
						onChangeText={(question) => this.setState({question})}
					/>
					<TextInput
						placeholder='Add an Answer'
						style={[styles.inputField,{ marginTop: 20}]} 
						maxLength={60}
						value={this.state.answer}
						onChangeText={(answer) => this.setState({answer})}
					/>
					{this.state.error &&
						<Text 
							style={[styles.error,{ marginTop: 10}]}>
							{this.state.error}
						</Text>
					}
					<DefaultBtn
						disabled={question === '' || answer === '' ? styles.disabled : styles.enabled}
						onPress={this.handleSubmit}
						style={{ backgroundColor: pink, borderColor: pink,  marginTop: 20}}
						textStyle={{color: white}}
					>
						Add Card
					</DefaultBtn>
				</View>
			</KeyboardAvoidingView>
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
export default connect(mapStateToProps)(AddCard)