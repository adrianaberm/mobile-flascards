import React, { Component } from 'react'
import { View, KeyboardAvoidingView, Text, TextInput } from 'react-native'
import DefaultBtn from './DefaultBtn'
import { white, black, pink } from '../utils/colors'
import { styles } from '../utils/styles'
import { addDeck } from '../actions/'
import { connect } from 'react-redux'

class AddDeck extends Component {
	state = {
		title: null,
		error: null,
	}

  handleSubmit = () => {
    const { navigation } = this.props
    const newDeck = this.state.title

		if (this.state.title == null) {
			this.setState({error: 'This field is required'})
		} else {
			this.props.dispatch(addDeck(newDeck))

			this.setState({title: null, error: null})
			navigation.navigate('Deck', { deckTitle: newDeck })
		}
  }

  render () {
    return (
      <View style={styles.container}> 
				<KeyboardAvoidingView behavior="padding" style={styles.deckContainer}>
					
					<Text style={styles.titles}>What is the title of your new deck?</Text>
					<TextInput 
						placeholder='Deck Title'
						style={[styles.inputField,{ marginTop: 30}]} 
						maxLength={60}
						value={this.state.title} 
						onChangeText={(title) => this.setState({title})}
					/>
					{this.state.error && 
						<Text 
						style={[styles.error,{ marginTop: 10}]}>
							{this.state.error}
						</Text>
					}
          <DefaultBtn
            onPress={this.handleSubmit}
            style={{backgroundColor: pink, borderColor: pink, marginTop: 50}}
            textStyle={{color: white}}
          >
            Create Deck
          </DefaultBtn>
				</KeyboardAvoidingView>
      </View>
    )
  }
}

export default connect()(AddDeck)
