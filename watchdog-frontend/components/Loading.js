import React, { Component } from 'react'
import { Loader } from 'rsuite'

class Loading extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <Loader size="lg" backdrop content="loading..." vertical />
        )

    }
}

export default Loading
