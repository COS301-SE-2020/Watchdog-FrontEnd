import Head from 'next/head'
import Login from '../components/Login'
import React, { Component, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'
import { useRouter } from 'next/router'
import '../config/AmplifyConfig'

const styling = {
  "backgroundColor": "black"
}
const defaulTitle = "Watchdog System"


function Index (props){
  const router = useRouter()
  useEffect(() => {
      Hub.listen('auth', (data) => {
        const { payload } = data
        console.log('A new auth event has happened: ', data)
         if (payload.event === 'signIn') {
           console.log('a user has signed in!')
           router.push("/Home")
         }
         if (payload.event === 'signOut') {
           console.log('a user has signed out!')
         }
      })
    }, [])
    Auth.currentAuthenticatedUser()
    .then(data => router.push("/Home"))
    .catch()
    return (
      
      <div  >
        <Head>
          <style>{'body { background-color: black; }'}</style>
          <meta charSet="UTF-8"/>
          <title>{props.title || defaulTitle}</title>
          <link rel = "stylesheet"
                type = "text/css"
                href = "/style.css"/>
        
        </Head>
          <Login />
        
      </div>
      
    )
  
}



export default Index
