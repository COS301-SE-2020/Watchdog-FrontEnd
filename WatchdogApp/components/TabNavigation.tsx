import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'
import DashboardTab from './DashboardTab'
import LiveTab from './LiveTab'
import RecordingsTab from './RecordingsTab'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'



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
                                return <Icon name={iconName} size={size} color={color} />;
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