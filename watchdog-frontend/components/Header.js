import link from 'next/link'
import React, { Component } from 'react';
const defaulTitle = "Watchdog System"
import Head from 'next/head'

class Header extends Component {
    constructor(){
        super()
    }
    
    render(){
        return (
            <Head>
            <meta charSet="UTF-8"/>
        <title>{this.props.title || defaulTitle}</title>
        <link rel = "stylesheet"
            type = "text/css"
            href = "/style.css"/>
        </Head>
        )
    }
}


export default Header