import Head from 'next/head'
import Login from '../components/Login'
import React, { Component, useEffect } from 'react'
import '../config/AmplifyConfig'
import SideNavBar from '../components/SideNavBar'
import 'rsuite/lib/styles/themes/dark/index.less'
// import 'custom-theme.less';

import { render } from 'react-dom'
import VideoFrameViewer from '../components/VideoFrameViewer'
import VideoSearchForm from '../components/VideoSearchForm'
const styling = {
  "backgroundColor": "black"
}
const defaulTitle = "Watchdog System"
const data = [
  {
    "id": 1,
    "date": "2016-09-23",
    "time": "12:00",
    "type": "Intruder",
    "location": "Yard",
    "url": "https://www.youtube.com/watch?v=oUFJJNQGwhk"

  }]

function Index (props){
  
    return (
      
      <div  >
        <Head>
          <meta charSet="UTF-8"/>
          <title>{props.title || defaulTitle}</title>
          <link rel = "stylesheet"
                type = "text/css"
                href = "/style.css"/>
        
        </Head>
        <div><SideNavBar /></div>
        <div>
          <div><VideoSearchForm/></div>
          <div><VideoFrameViewer data={data}/></div>
        
        </div>
          
        
      </div>
      
    )
  
}



export default Index
