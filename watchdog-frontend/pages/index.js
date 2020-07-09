import Head from 'next/head'
import Login from '../components/Login'
import React, { Component, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'
import Router, { useRouter } from 'next/router'
import '../config/AmplifyConfig'
import 'rsuite/lib/styles/themes/dark/index.less'
import SideNavBar from '../components/SideNavBar'
import {Container, Header, Content} from 'rsuite'
import HistoricalVideo from '../components/HistoricalVideo'
import LiveVideo from '../components/LiveVideoLayout'
import HomePage from '../components/HomePage'
import SettingsScreen from '../components/SettingsScreen'

const styling = {
  "backgroundColor": "black"
}
const defaulTitle = "Watchdog System"

class Index extends Component{
  constructor(){
    super()
    this.state ={
      loggedIn : false,
      activeKey : 1,
      defaultKey : "1"

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

    this.tabHandler = this.tabHandler.bind(this)
    this.quickAccess = this.quickAccess.bind(this)
          
  }

  tabHandler(val){
    this.setState({activeKey : val, defaultKey : `${val}`})
  }

  quickAccess(val){
    this.setState({activeKey : val, defaultKey : `${val}`},()=>console.log(this.state))

  }

  render(){
    if(!this.state.loggedIn){
      return(
        <div  >
          <Head>
            <style>{'body { background-color: black; }'}</style>
            <meta charSet="UTF-8"/>
            <title>{this.props.title || defaulTitle}</title>
            <link rel = "stylesheet"
                  type = "text/css"
                  href = "/style.css"/>
          
          </Head>
          <Login /> 

          
          
        </div>
      )
    }else{
      return(
        <div>
          <Head>
          <meta charSet="UTF-8"/>
          <title>{this.props.title || defaulTitle}</title>
          <link rel = "stylesheet"
                type = "text/css"
                href = "/style.css"/>
        
        </Head>
        <Container style={{maxWidth: "1700px", margin: 'auto'}}>
          <Header><div style={{textAlign :'center'}}><h1>Watchdog</h1></div></Header>
          <Container>
            <SideNavBar handleChange = {this.tabHandler} defaultKeyVal={this.state.defaultKey}/>
            <Content>
              {this.state.activeKey===1&&<HomePage handleChange={this.quickAccess}/>}
              {this.state.activeKey===2&&<LiveVideo/>}
              {this.state.activeKey===3&&<HistoricalVideo/>}
              {this.state.activeKey===4&&<SettingsScreen />}
            </Content>
            


          </Container>
        </Container>
        </div>
      )
    }

  }
  
}

// function Index (props){
//   //const router = useRouter()
//   useEffect(() => {
//       Hub.listen('auth', (data) => {
//         const { payload } = data
//         //console.log('A new auth event has happened: ', data)
//          if (payload.event === 'signIn') {
//            //console.log('a user has signed in!')
//            Router.push("/Home")
//          }
//          if (payload.event === 'signOut') {
//            //console.log('a user has signed out!')
//          }
//       })
//     }, [])
//     Auth.currentAuthenticatedUser()
//     .then(data => Router.push("/Home"))
//     .catch(error => {})
//     return (
      
//       <div  >
//         <Head>
//           <style>{'body { background-color: black; }'}</style>
//           <meta charSet="UTF-8"/>
//           <title>{props.title || defaulTitle}</title>
//           <link rel = "stylesheet"
//                 type = "text/css"
//                 href = "/style.css"/>
        
//         </Head>
//           <Login />
        
//       </div>
      
//     )
  
// }



export default Index
