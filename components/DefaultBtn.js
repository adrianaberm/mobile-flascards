import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function DefaultBtn ({children, onPress, textStyle={}, style={}}) {
  return (
		
			<TouchableOpacity style={[styles.defaultbtn, style]} onPress={onPress}>
				<Text style={[styles.btnText, textStyle]}>{children}</Text>
			</TouchableOpacity>
	
  )
}

const styles = StyleSheet.create({
  defaultbtn: {
		justifyContent: 'center',
		width: 280, 
		height: 50,
		borderRadius: 4,
		borderWidth: 1,
		marginBottom: 20,
  },
  btnText: {
    textAlign: 'center',
		fontSize: 20,
	},
})
