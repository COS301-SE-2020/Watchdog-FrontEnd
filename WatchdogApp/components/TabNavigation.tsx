import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DashboardTab from './Dashboard'
import LiveTab from './Live'
import RecordingsTab from './Recordings'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'



const Tab = createBottomTabNavigator();

class TabNavigation extends Component{
    constructor(props: any){
        super(props)
    }

    render(){
        return(
            <SafeAreaProvider>
                
                    <Tab.Navigator>
                        <Tab.Screen name="Recordings" component={RecordingsTab} />
                        <Tab.Screen name="Dashboard" component={DashboardTab} />
                        <Tab.Screen name="Live" component={LiveTab} />                        
                    </Tab.Navigator>

                
            </SafeAreaProvider>
                
            
        )
    }
}

export default TabNavigation