import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'
import DashboardTab from './Dashboard'
import LiveTab from './Live'
import RecordingsTab from './Recordings'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'



const Tab = createBottomTabNavigator();
class TabNavigation extends Component{
    constructor(props: any){
        super(props)
    }

    render(){

        return(
            <SafeAreaProvider>
                
                    <Tab.Navigator
                        screenOptions={(route: any)=>({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName =''
                                
                    
                                if (route.route.name === 'Dashboard') {
                                  iconName = focused
                                    ? 'ios-information-circle'
                                    : 'ios-information-circle-outline'
                                } else if (route.route.name === 'Recordings') {
                                  iconName = focused ? 'ios-recording' : 'ios-recording'
                                }else if(route.route.name === 'Live'){
                                    iconName = focused ? 'videocam-outline' : 'videocam-outline'
                                }
                            
                                // You can return any component that you like here!
                                return <Ionicons name={iconName} size={size} color={color} />;
                              },
                        })}
                    >
                        <Tab.Screen  name="Recordings" component={RecordingsTab} />
                        <Tab.Screen name="Dashboard" component={DashboardTab} />
                        <Tab.Screen name="Live" component={LiveTab} />                        
                    </Tab.Navigator>

                
            </SafeAreaProvider>
                
            
        )
    }
}

export default TabNavigation