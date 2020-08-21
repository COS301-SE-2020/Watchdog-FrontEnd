import React, { Component } from 'react'
import { Loader } from 'rsuite'

class Loading extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div style={{width: '100%', height : '100%', display: 'flex', justifyContent : 'center', alignItems : 'center'}}>
                <Loader size="lg"  content="loading..." vertical />
            </div>
            
        )

    }
}

export default Loading
