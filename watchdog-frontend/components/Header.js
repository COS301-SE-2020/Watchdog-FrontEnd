import link from 'next/link'
import React, { Component } from 'react';
const defaulTitle = "Watchdog System"

class Header extends Component {
    constructor(){
        super()
    }
    
    render(){
        return (
            <head>
            <meta charSet="UTF-8"/>
        <title>{this.props.title || defaulTitle}</title>
        <link rel = "stylesheet"
            type = "text/css"
            href = "/style.css"/>
        </head>
        )
    }
}


export default Header