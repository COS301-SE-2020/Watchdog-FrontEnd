import navButtons from "../config/buttons"
import NavBar from "../components/NavBar";
import React, {Component, useEffect} from 'react'
import  { Auth, Hub } from 'aws-amplify'
import { useRouter } from 'next/router'
import Head from 'next/head'
import '../config/AmplifyConfig'

const defaulTitle = "Watchdog System"
function Landing(props){
  const router = useRouter()
  
  useEffect(() => {
      Hub.listen('auth', (data) => {
        const { payload } = data
        console.log('A new auth event has happened: ', data)
         if (payload.event === 'signIn') {
           console.log('a user has signed in!')
         }
         if (payload.event === 'signOut') {
           console.log('a user has signed out!')
           router.push("/index")
         }
      })
      
    }, [])

    Auth.currentAuthenticatedUser()
    .then(data => console.log(data))
    .catch(err => router.push("/index"));
    return (
      <div>
        <Head>
          <meta charSet="UTF-8"/>
          <title>{props.title || defaulTitle}</title>
          <link rel = "stylesheet"
                type = "text/css"
                href = "/style.css"/>
        
        </Head>
        <NavBar navButtons={navButtons} />
    </div>
    )
  
}
export default Landing