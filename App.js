import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { FontAwesome, Foundation, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo' 
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Card from './components/Card'
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'
import { white, black, purple, pink, gray, lightgray} from './utils/colors'


function FlashCardsStatusBar ({backgroundColor, ...props}) {
	return (
		<View style={{backgroundColor, height: Constants.statusBarHeight}}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

const Tabs = createBottomTabNavigator({
  DeckList : {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'My Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-albums' size={30} color={tintColor} />

    },

  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle-outline' size={30} color={tintColor} />
    },
  }
},
{
  navigationOptions: {
    header: null,
    
  },
   tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? pink : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})



const MainNavigator = createStackNavigator({
	Home: {
		screen: Tabs, 
		navigationOptions: {
			title: 'Flash Cards',
			headerStyle: {
            backgroundColor: purple,
        },
        headerTitleStyle: {
            color: 'white',
        },
        headerBackTitleStyle: {
            color: 'white',
        },
        headerTintColor: 'white',
		}
	}, 
	Deck: {
		screen: Deck, 
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple,
			}
		},
	},
	AddCard: {
		screen: AddCard, 
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple,
			}
		},
	},
	Card: {
		screen: Card, 
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple,
			}
		},
	},

})

export default class App extends React.Component {
	componentDidMount () {
		setLocalNotification()
	}
  render() {
    return (
			<Provider store={createStore(reducer)}>
				<View style={{flex: 1}}>
					<FlashCardsStatusBar backgroundColor={purple} barStyle="light-content"/>
					<MainNavigator />
				</View>
			</Provider>
    )
  }
}
