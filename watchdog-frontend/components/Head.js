import Head from 'next/head'
import link from 'next/link'
import { Component } from 'react';
const defaulTitle = "Watchdog System"


const Head = props =>(
        <Head>
            <meta charSet="UTF-8"/>
        <title>{props.title || defaulTitle}</title>
        <link rel = "stylesheet"
   type = "text/css"
   href = "styles.css"></link>
        </Head>
    );

    export default Head