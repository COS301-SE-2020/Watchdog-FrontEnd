import '../config/AmplifyConfig'
import { indexProps, indexState } from '../interfaces/index'
import { Auth, Hub } from 'aws-amplify'
import UserManagement from '../components/UserManagement'
import App from '../components/App'
import Head from 'next/head'

import React, { Component } from 'react';

class index extends Component<indexProps, indexState> {
  constructor(props: indexProps) {
    super(props)
    this.state = {
      loggedIn: false
    }
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
  render() {
    return (
      this.state.loggedIn ? <div className="App" >
        <Head>
          <meta charSet="UTF-8"/>
          <title>Watchdog</title>
          <link rel = "stylesheet"
                type = "text/css"
                href = "/style.css"/>
        
        </Head>
        <App /></div> : <UserManagement />
    )
  }
}
export default index
