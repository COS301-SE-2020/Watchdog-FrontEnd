import React, { Component } from 'react'
import {Header} from 'react-native-elements' 
import stylesheet from '../styling'
import { useTheme } from "react-native-themed-styles"
import { Layout, Text } from '@ui-kitten/components'

interface HeaderBarProps{
    text : string
}


class HeaderBar extends Component<HeaderBarProps> {
    constructor(props: HeaderBarProps){
        super(props)
    }

    render() {
        return (
            <Layout>
            <Header
            placement="center"
            centerComponent={{ text: this.props.text, style : stylesheet.Heading}}
            
          />
          </Layout>
        )
    }
}

export default HeaderBar