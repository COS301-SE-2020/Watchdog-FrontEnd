import React, {Component} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DashboardTab from './DashboardTab'
import LiveTab from './LiveTab'
import RecordingsTab from './RecordingsTab'
import { SafeAreaProvider } from 'react-native-safe-area-context'


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