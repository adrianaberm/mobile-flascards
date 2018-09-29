import { StyleSheet } from 'react-native'
import { white, black, gray, red, lightgray, mediumgray } from './colors'

export const styles = StyleSheet.create({
  container: {
  	backgroundColor: white,
    flex: 1,
  	alignItems: 'center',
  },

  description: {
  	paddingTop: 15,
  	paddingBottom: 15,
  	textAlign: 'center',
  	shadowColor: '#000',
    shadowOffset: { width: 10, height: 0 },
    elevation: 1,
    shadowOpacity: 0.2,

  },

  deckContainer: {
  	backgroundColor: white,
  	flex: 1,
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  deck: {
  	backgroundColor: lightgray,
  	borderBottomWidth: 1,
  	borderBottomColor: mediumgray,
  	paddingTop: 30,
  	paddingBottom: 30,
  	shadowColor: '#000',
    shadowOffset: { width: 10, height: 0 },
     elevation: 1,
    shadowOpacity: 0.2,
  },

    cardContainer: {
    backgroundColor: white,
  
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  titles: {
  	fontSize: 25,
  	textAlign: 'center',
  },
	cardContent: {
    backgroundColor: white,
    justifyContent: 'center',
  	alignItems: 'center',
  	minHeight: 200,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
     elevation: 1,
    shadowOpacity: 0.2,
  },
  backCard: {

  	backgroundColor: white,
    justifyContent: 'center',
  	alignItems: 'center',
  	minHeight: 200,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: 300,
  	position: 'absolute',
  	top: 0,
  	shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
     elevation: 1,
    shadowOpacity: 0.2,
  },

  resultContainer: {
  	flex:1,
  	backgroundColor: white,
    justifyContent: 'center',
  	alignItems: 'center',
  },


  inputField: {
  	backgroundColor: white,
  	borderWidth: 1,
  	borderColor: '#ccc',
  	fontSize: 15,
  	paddingTop: 10,
  	paddingBottom: 10,
  	paddingLeft: 10,
  	paddingRight: 10,
    width: 280,
  },

  error: {
  	color: red,
  	textAlign: 'center',
  },
 
	flipCard: {
	
		backfaceVisibility: 'hidden',
	},
	flipCardBack: {
		backgroundColor: white,
		position: 'absolute', 
		top: 0,
	},
	

		disabled: {
		backgroundColor: black
	}
})
