import React, { Component } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderBar from "./HeaderBar"
import styles from '../styling'
class LiveTab extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View style = {styles.Main}>
                <HeaderBar text={"Live"}></HeaderBar>
                <Text>This is the LIVE Page</Text>
                
            </View>
            
        );
    }
}

export default LiveTab;