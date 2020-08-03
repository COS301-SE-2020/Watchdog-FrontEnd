import { StatusBar } from 'expo-status-bar'
import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './components/TabNavigation'
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



class App extends Component{
  constructor(props: any){
    super(props)
  }

  render(){
    return(
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>      
    )
  }

}


export default App
