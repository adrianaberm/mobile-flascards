import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Button, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import DefaultBtn from './DefaultBtn'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { green, red, white, gray, black , purple, lightgray, pink} from '../utils/colors'
import { FontAwesome } from '@expo/vector-icons'
import { styles } from '../utils/styles'


class Card extends Component {

		static navigationOptions = ({ navigation }) => {
		const { deckTitle } = navigation.state.params

		return {
			title: deckTitle + ' Questions'
		}
	}


	state = {
		showAnswer: false,
		questionNumber: 0, 
		record: 0,
	}



	componentWillMount() {

		this.animatedValue = new Animated.Value(0)
		this.value = 0 

		this.animatedValue.addListener(({ value }) => {
			this.value = value
		})
		this.setState(() => ({
			frontOpacity: new Animated.Value(1),
			backOpacity: new Animated.Value(0),
		}))

		this.frontInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180], 
			outputRange: ['0deg', '180deg'],
		})
		this.backInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180], 
			outputRange: ['180deg', '360deg'],
		})
		 this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
	}


	correct = (increase) => {
		this.flipCard()
		this.setState({showAnswer: !this.state.showAnswer})
		this.setState(() => ({
			questionNumber: this.state.questionNumber + 1, 
			record: this.state.record + increase,
		}))

	}

	startOver = () => {
		this.flipCard()
		this.setState({showAnswer: !this.state.showAnswer})
		this.setState(() => ({
			questionNumber: 0,
			record: 0,
		}))
	}

	flipCard = () => {

		const toFront = {
			toValue: 1, 
		
		}
		const toBack = {
			toValue: 0, 

		}
	

		if (this.value >= 90) {
					Animated.timing(this.animatedValue,{
			toValue: 0 ,
			duration: 300
		}).start()
		} else {
			Animated.timing(this.animatedValue,{
			toValue: 180 ,
			duration: 300
		}).start()
		}
		 this.setState({showAnswer: !this.state.showAnswer})
	}

	render () {
		const { showAnswer } = this.state
		const { deck, navigation } = this.props
		const { questionNumber, record } = this.state
		const numQuestions = deck.questions.length
		  const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate},
      ],
      opacity: this.frontOpacity
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ],
      opacity: this.backOpacity
    }

    const question = deck.questions[questionNumber]


		if (questionNumber >= numQuestions) {
			
			const percentCorrect = Math.floor((record / numQuestions)*100)
			
			clearLocalNotification()
			.then(setLocalNotification)
		
			return (
				<View style={{flex:1}}>
					<View style={styles.resultContainer}>

						<Text style={{color: purple, fontSize: 30, textAlign: 'center', paddingTop: 20, paddingBottom: 10}}>
							You got: {record} right answers
						</Text>
						<Text style={{fontSize: 20, textAlign: 'center', paddingBottom: 30}}>
								({percentCorrect}% correct)
						</Text>

							<DefaultBtn 
								onPress={this.startOver}
								style={{backgroundColor:lightgray, borderColor: pink}} 
								textStyle={{color: pink}}
							> 
								Restart Quiz
							</DefaultBtn>
							<DefaultBtn 
								onPress={() => navigation.goBack()} 
								style={{backgroundColor: pink, borderColor: pink}} 
								textStyle={{color: white}}
							> 
								Back to Deck
							</DefaultBtn>
					</View>
				</View>
			)
		}
		
		

		return (
			<View style={styles.container}>
				<View> 
					<Text style={{fontSize: 20, textAlign: 'center', paddingTop: 20, paddingBottom: 20}}>Question: {questionNumber+1} of {numQuestions}</Text>
				</View>
				<View>
					<Animated.View style={[styles.cardContent, frontAnimatedStyle]}>
						<Text style={styles.titles}>{question.question}</Text>
				
					</Animated.View>
					<Animated.View style={[styles.backCard, backAnimatedStyle]}>
						<Text style={[styles.titles]}>{question.answer}</Text>
						
					</Animated.View>

        <TouchableOpacity onPress={() => this.flipCard()}>
          <Text style={{paddingTop: 20, paddingBottom: 20, fontSize: 20, textAlign: 'center', color: purple}}>
          <FontAwesome name='refresh' size={30} color={purple} />
            { showAnswer ? ' Show question' : ' Show answer'}
          </Text>
        </TouchableOpacity>
				</View>
				<View style={styles.buttonContainer}>
					<DefaultBtn
						onPress={() => this.correct(1)} 
						style={{backgroundColor: green, borderColor: green, marginTop: 30, marginBottom: 20}} 
						textStyle={{color: white}}
					> 
						Correct
					</DefaultBtn>
					<DefaultBtn onPress={() => this.correct(0)}
						style={{backgroundColor: red, borderColor: red}} 
						textStyle={{color: white}}
					> 
						Incorrect
					</DefaultBtn>
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

export default connect(mapStateToProps)(Card)
