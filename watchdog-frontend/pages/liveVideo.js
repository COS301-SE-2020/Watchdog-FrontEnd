import React, {Component, useEffect} from 'react'
import  { Auth, Hub } from 'aws-amplify'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import '../config/AmplifyConfig'
import 'rsuite/lib/styles/themes/dark/index.less'
import SideNavBar from '../components/SideNavBar'
import { Container, Header, Content, Footer} from 'rsuite'

const defaulTitle = "Watchdog System"
function liveVideo(props){
  //const router = useRouter()
  
  useEffect(() => {
      Hub.listen('auth', (data) => {
        const { payload } = data
        //console.log('A new auth event has happened: ', data)
         if (payload.event === 'signIn') {
           //console.log('a user has signed in!')
         }
         if (payload.event === 'signOut') {
           //console.log('a user has signed out!')
           Router.push("/index")
         }
      })
      
    }, [])

    Auth.currentAuthenticatedUser()
    .then(data => {})
    .catch(err => Router.push("/index"));
    return (
      <div>
        <Head>
          <meta charSet="UTF-8"/>
          <title>{props.title || defaulTitle}</title>
          <link rel = "stylesheet"
                type = "text/css"
                href = "/style.css"/>
        
        </Head>
        <Container>
          <Header><div style={{textAlign :'center'}}><h1>Watchdog</h1></div></Header>
          <Container>
            <SideNavBar MenuNumber={'2'}/>
            <Content></Content>
            <Footer></Footer>
          </Container>
        </Container>
    </div>
    )
  
}
export default liveVideo