import '../config/AmplifyConfig'
import { indexProps, indexState } from '../interfaces/index'
import { Auth, Hub } from 'aws-amplify'
import UserManagement from '../components/UserManagement'
import App from '../components/App'
import Head from 'next/head'
import LoadingOverlay from 'react-loading-overlay'
import MoonLoader from 'react-spinners/MoonLoader'

import React, { Component } from 'react';

class index extends Component<indexProps, indexState> {
  constructor(props: indexProps) {
    super(props)
    this.state = {
      loggedIn: false,
      loading: true
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
      .then(data => this.setState({ loggedIn: true, loading: false }))
      .catch(error => { this.setState({ loading: false }) })
  }
  render() {
    return (
      this.state.loggedIn ? <div className="App" >
        <Head>
          <meta charSet="UTF-8" />
          <title>Watchdog</title>
          <link rel="stylesheet"
            type="text/css"
            href="/style.css" />

        </Head>
        <App /></div> : <div className="App" >
          <Head>
            <meta charSet="UTF-8" />
            <title>Watchdog</title>
            <link rel="stylesheet"
              type="text/css"
              href="/style.css" />

          </Head>
          <LoadingOverlay
            active={this.state.loading}
            spinner={<MoonLoader color={'#25b3f5'} />}
            style={{ wrapper: { width: '100vw', height: '100vh' } }}

          > <UserManagement /> </LoadingOverlay></div>
    )
  }
}
export default index
