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
        <div className='navDiv'><SideNavBar /></div>
        <div className='videoDiv' style={{color:"white"
        }}>
          <div><VideoSearchForm/></div>
          <div><VideoFrameViewer/></div>
        
        </div>
          
        
      </div>
      
    )
  
}



export default Index
