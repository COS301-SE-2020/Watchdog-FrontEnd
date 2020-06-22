import Head from 'next/head'
import Login from '../components/Login'
import React, { Component } from 'react';

class Home extends Component{
  constructor(){
    super();
  }

  render(){
    const styling = {
      "backgroundColor": "black"
    }
    const defaulTitle = "Watchdog System"
    return (
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
  }
  

}

export default Home
