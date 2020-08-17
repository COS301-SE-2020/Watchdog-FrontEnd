import React, { Component } from 'react'
import { StyleSheet, Appearance } from 'react-native'
import { AppearanceProvider } from 'react-native-appearance'
import Amplify from 'aws-amplify'
import { Auth, Hub } from 'aws-amplify'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { Provider } from 'react-redux'

import Login from './components/Login'
import TabNavigation from './components/TabNavigation'
import store from './app-redux/store'
import SocketManager from './app-redux/socketManager'


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

interface appState {
  loggedIn: boolean
  theme: any
}

interface appProps {

}

class App extends Component<appProps, appState>{
  constructor(props: any) {
    super(props)


    let colorScheme = Appearance.getColorScheme();
    //console.log(colorScheme)
    this.state = {
      loggedIn: false,
      theme: colorScheme
    }

    Appearance.addChangeListener((color) => {
      this.setState({ theme: color.colorScheme })
      //console.log(color.colorScheme)
    })

    Hub.listen('auth', (data) => {
      const { payload } = data
      //console.log('A new auth event has happened: ', data)
      if (payload.event === 'signIn') {
        console.log('a user has signed in!')
        this.setState({ loggedIn: true })
        //Router.push("/Home")
      }
      if (payload.event === 'signOut') {
        this.setState({ loggedIn: false })
        //console.log('a user has signed out!')
      }
    })

    Auth.currentAuthenticatedUser()
      .then(data => this.setState({ loggedIn: true }))
      .catch(error => { })
  }

  componentDidMount = () => {
    SocketManager.connect()
  }

  componentWillUnmount = () => { 
    SocketManager.disconnect()
  }

  render() {
    const theme = this.state.theme === 'dark' ? eva.dark : eva.light
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={theme}>
          <AppearanceProvider>
            <Provider store={store}>
              {
                this.state.loggedIn ?
                  <TabNavigation /> : <Login />
              }
            </Provider>
          </AppearanceProvider>
        </ApplicationProvider>
      </>
    )
  }

}


export default App
