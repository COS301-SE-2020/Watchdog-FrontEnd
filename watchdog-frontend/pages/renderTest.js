import Head from 'next/head'
import Login from '../components/Login'
import React, { Component, useEffect } from 'react'
import '../config/AmplifyConfig'
import SideNavBar from '../components/SideNavBar'
import 'rsuite/lib/styles/themes/dark/index.less'

const styling = {
  "backgroundColor": "black"
}
const defaulTitle = "Watchdog System"


function Index (props){
  
    return (
      
      <div  >
        <Head>
          <style>{'body { background-color: blue; }'}</style>
          <meta charSet="UTF-8"/>
          <title>{props.title || defaulTitle}</title>
          <link rel = "stylesheet"
                type = "text/css"
                href = "/style.css"/>
        
        </Head>
        <div><SideNavBar /></div>
          
        
      </div>
      
    )
  
}



export default Index
