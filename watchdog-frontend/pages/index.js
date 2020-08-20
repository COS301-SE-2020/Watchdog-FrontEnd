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
import TopNavBar from '../components/TopNavBar'
import LogsModal from '../components/LogsModal'
import DownloadsModal from '../components/DownloadsModal'
import IdentitySettingsModal from '../components/IdentitySettingsModal'
import DetectedImagesModal from '../components/DetectedImagesModal'
import NotificationSettingsModal from '../components/NotificationSettingsModal'
import PasswordSettingsModal from '../components/PasswordSettingsModal'

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
      defaultKey : "1",
      logsModal : false,
      downloadModal : false,
      identitySettingsModal : false,
      detectedImagesModal : false,
      notificationModal : false,
      passwordSettingsModal : false

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
    this.toggleLogsModal = this.toggleLogsModal.bind(this)
    this.toggleDownloadsModal = this.toggleDownloadsModal.bind(this)
    this.toggleIdentitySettingsModal = this.toggleIdentitySettingsModal.bind(this)
    this.toggleDetectedImagesModal = this.toggleDetectedImagesModal.bind(this)
    this.toggleNotificationsModal = this.toggleNotificationsModal.bind(this)
    this.togglePasswordSettingsModal = this.togglePasswordSettingsModal.bind(this)
          
  }

  tabHandler(val){
    if(val==5){
      this.toggleLogsModal()
      return
    }

    if(val==6){
      this.toggleDownloadsModal()
      return
    }

    if(val==7){
      this.toggleIdentitySettingsModal()
      return
    }

    if(val==8){
      this.toggleDetectedImagesModal()
      return
    }

    if(val==9){
      this.toggleNotificationsModal()
      return
    }

    if(val==10){
      this.togglePasswordSettingsModal()
      return
    }

    this.setState({activeKey : val, defaultKey : `${val}`})
  }
  togglePasswordSettingsModal(){
    this.setState({passwordSettingsModal : !this.state.passwordSettingsModal})

  }
  toggleNotificationsModal(){
    this.setState({notificationModal : !this.state.notificationModal})
  }

  toggleDetectedImagesModal(){
    this.setState({detectedImagesModal : !this.state.detectedImagesModal})
  }

  toggleIdentitySettingsModal(){
    this.setState({identitySettingsModal : !this.state.identitySettingsModal})
  }

  toggleDownloadsModal(){
    this.setState({downloadModal : !this.state.downloadModal})
  }



  quickAccess(val){
    this.setState({activeKey : val, defaultKey : `${val}`},()=>console.log(this.state))

  }

  toggleLogsModal(){
    this.setState({logsModal : !this.state.logsModal})
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
          <Header> <TopNavBar  handleChange = {this.tabHandler} /> </Header>
          <Container>
            {/* <SideNavBar handleChange = {this.tabHandler} defaultKeyVal={this.state.defaultKey}/> */}
            < LogsModal toggle={this.toggleLogsModal} show ={this.state.logsModal} />
            < DownloadsModal toggle={this.toggleDownloadsModal} show ={this.state.downloadModal} />
            < IdentitySettingsModal toggle={this.toggleIdentitySettingsModal} show ={this.state.identitySettingsModal} />
            < DetectedImagesModal toggle={this.toggleDetectedImagesModal} show ={this.state.detectedImagesModal} />
            < NotificationSettingsModal toggle={this.toggleNotificationsModal} show ={this.state.notificationModal} />
            < PasswordSettingsModal toggle={this.togglePasswordSettingsModal} show ={this.state.passwordSettingsModal} />
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
