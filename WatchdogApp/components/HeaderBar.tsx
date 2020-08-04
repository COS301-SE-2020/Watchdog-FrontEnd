import React, { Component } from 'react'
import {Header} from 'react-native-elements' 
import stylesheet from '../styling'
import { useTheme } from "react-native-themed-styles"

interface HeaderBarProps{
    text : string
}


class HeaderBar extends Component<HeaderBarProps> {
    constructor(props: HeaderBarProps){
        super(props)
    }

    render() {
        return (
            <Header
            placement="center"
            centerComponent={{ text: this.props.text, style : stylesheet.Heading}}
            containerStyle={{
                backgroundColor: '#169de0',
                justifyContent: 'space-around',
              }}
            
          />
        )
    }
}

export default HeaderBar