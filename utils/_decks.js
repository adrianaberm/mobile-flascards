import { AsyncStorage } from 'react-native'


export const DECK_STORAGE_KEY = 'MobileFlashCards:cards'


function getInitialDecks() {
	return {
		React: {
			title: 'React',
			questions: [
				{
					question: 'What is React?',
					answer: 'A library for managing user interfaces'
				},
				{
					question: 'Where do you make Ajax requests in React?',
					answer: 'The componentDidMount lifecycle event'
				}
			]
		},
		JavaScript: {
			title: 'JavaScript',
			questions: [
				{
					question: 'What is a closure?',
					answer: 'The combination of a function and the lexical environment within which that function was declared.'
				}
			]
		}
	}
}

function setDeckData () {
  let dummyData = getInitialDecks()

  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}



export function formatDeckResults (results) {

  return results === null
    ? setDeckData()
    : JSON.parse(results) 
}

