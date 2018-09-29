import { AsyncStorage } from 'react-native'
import { formatDeckResults, DECK_STORAGE_KEY }  from './_decks'

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
	.then(formatDeckResults)
}

export function getDeck (title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      return data[title]
    })
}


export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: { title: title, questions: [] }, 
  }))
}

export function addCardToDeck(title, card) {
  AsyncStorage.getItem(DECK_STORAGE_KEY)
	.then((result) => {
		const oldVal = JSON.parse(result)
		const newQs = [...oldVal[title].questions, card]
		return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
			[title]: {
				questions: newQs
			}
		}))
	})
}
