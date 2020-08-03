import React, { Component } from "react"
import { View, Text } from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'
class DashboardTab extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <Text>This is the DASHBOARD Page</Text>
            </SafeAreaView>
        );
    }
}

export default DashboardTab;