import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardTab from './Dashboard'
import LiveTab from './Live'
import RecordingsTab from './Recordings'
const Tab = createBottomTabNavigator();
class TabNavigation extends Component{
    constructor(props: any){
        super(props)
    }

    render(){
        return(
            <Tab.Navigator>
                <Tab.Screen name="Dashboard" component={DashboardTab} />
                <Tab.Screen name="Live" component={LiveTab} />
                <Tab.Screen name="Recordings" component={RecordingsTab} />
            </Tab.Navigator>
        )
    }
}

export default TabNavigation