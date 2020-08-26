import Link from 'next/link'
import '../config/AmplifyConfig'
import App from '../components/App'
import  { stateIndex, propsIndex } from '../interfaces/index'
import React, { Component } from 'react';
import { Auth, Hub } from 'aws-amplify'
import UserAuthentication from '../components/UserAuthentication'


class index extends Component<propsIndex, stateIndex> {
  constructor(props: propsIndex){
    super(props)
    this.state = {
      loggedIn : false,
      darkMode : true
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

    this.toggleDark = this.toggleDark.bind(this)

  }
  toggleDark(){
    this.setState({darkMode : !this.state.darkMode})
  }
  render() {
    if(this.state.loggedIn){
       return( <div className ={this.state.darkMode?'bp3-dark':''}><App toggleDark={this.toggleDark}/></div>)
    }
   
    return (
      <UserAuthentication />
    )

  }
}

export default index



