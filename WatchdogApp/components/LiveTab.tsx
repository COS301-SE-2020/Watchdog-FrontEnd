import React, { Component } from "react";
import { View, Text, Appearance  } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderBar from "./HeaderBar"
import { DarkModeContext } from 'react-native-dynamic'
import {  AppearanceProvider, useColorScheme } from 'react-native-appearance';

interface LiveTabProps{

}
interface LiveTabState{
    theme: any
}


class LiveTab extends Component<LiveTabProps,LiveTabState> {
 
    static contextType = DarkModeContext
    constructor(props: any) {
        super(props)

        let colorScheme= Appearance.getColorScheme();
        console.log(colorScheme)
        this.state={
            theme: colorScheme
        }
        Appearance.addChangeListener((color)=>{
            this.setState({theme:color.colorScheme})
        })
        

        
    }

    
    render() {
        //console.log(this.context)
        const isDarkMode = this.state.theme === 'dark'
        return (
            
            <View style = {{backgroundColor: isDarkMode ? 'black' : 'white', flex : 1 }}>
                <HeaderBar text={"Live"}></HeaderBar>
                <Text>This is the LIVE Page</Text>
                
            </View>
            
        );
    }
}

export default LiveTab;