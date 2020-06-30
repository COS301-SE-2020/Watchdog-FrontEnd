import Head from 'next/head'
import Login from '../components/Login'
import React, { Component, useEffect } from 'react'
import '../config/AmplifyConfig'
import SideNavBar from '../components/SideNavBar'
import 'rsuite/lib/styles/themes/dark/index.less'
// import 'custom-theme.less';
import VideoFilterForm from '../components/VideoFilterForm'

import { render } from 'react-dom'
import HistoricalVideo from '../components/HistoricalVideo'
import VideoSearchForm from '../components/VideoSearchForm'
import { Container, Header, Content, Footer} from 'rsuite'
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
        <Container>
          <Header><div style={{textAlign :'center'}}><h1>Watchdog</h1></div></Header>
          <Container>
            <SideNavBar MenuNumber={'3'}/>
            <Content><HistoricalVideo/></Content>
          </Container>
          <Footer></Footer>
        </Container>
        {/* <Container>
          <SideNavBar MenuNumber={'1'}/>
          <Container>
            <Header><div style={{textAlign :'center'}}><h1>Watchdog</h1></div></Header>
            <Content><HistoricalVideo/></Content>
            <Footer></Footer>
          </Container>
        </Container> */}
        {/* <div><SideNavBar /></div>
        <div>
          <div><VideoFilterForm/></div>
          <div><VideoFrameViewer data={data}/></div>
        
        </div> */}
          
        
      </div>
      
    )
  
}



export default Index
