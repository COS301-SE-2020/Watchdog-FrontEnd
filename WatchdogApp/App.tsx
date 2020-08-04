import { StatusBar } from 'expo-status-bar'
import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './components/TabNavigation'
import { AppearanceProvider } from 'react-native-appearance'
import Amplify from 'aws-amplify'
import { Authenticator } from 'aws-amplify-react-native'
import { Auth, Hub } from 'aws-amplify'

import Login from './components/Login'
const Tab = createBottomTabNavigator();

Amplify.configure({
  Auth: {

      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      //identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

      // REQUIRED - Amazon Cognito Region
      region: 'eu-west-1',

      // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
      // Required only if it's different from Amazon Cognito Region
      identityPoolRegion: 'eu-west-1',

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'eu-west-1_mQ0D78123',

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: 'lcrgnjetqoieui4dmg7m5h8t4',

      
      
  }
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface appState{
  loggedIn : boolean
}

interface appProps{

}

class App extends Component<appProps, appState>{
  constructor(props: any){
    super(props)
    this.state ={
      loggedIn : false
    }

    Hub.listen('auth', (data) => {
      const { payload } = data
      //console.log('A new auth event has happened: ', data)
       if (payload.event === 'signIn') {
         console.log('a user has signed in!')
         this.setState({loggedIn : true})
         //Router.push("/Home")
       }
       if (payload.event === 'signOut') {
         this.setState({loggedIn : false})
         //console.log('a user has signed out!')
       }
    })

    Auth.currentAuthenticatedUser()
    .then(data => this.setState({loggedIn : true}))
    .catch(error => {})
  }

  render(){
    return(
      <AppearanceProvider>    
        {this.state.loggedIn?   
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer> :
        <Login/>} 
      </AppearanceProvider>    
    )
  }

}


export default App
