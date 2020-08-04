import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'
import DashboardTab from './DashboardTab'
import LiveTab from './LiveTab'
import RecordingsTab from './RecordingsTab'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { MaterialIcons, Ionicons, MaterialCommunityIcons, Feather, FontAwesome  } from '@expo/vector-icons'


const Tab = createBottomTabNavigator();
class TabNavigation extends Component{
    constructor(props: any){
        super(props)
    }

    render(){

        return(
            <SafeAreaProvider style={{backgroundColor: "black"}}>
                
                    <Tab.Navigator
                        screenOptions={(route: any)=>({
                            tabBarIcon: ({ focused, color, size }) => {
                                let icon:any
                                
                    
                                if (route.route.name === 'Dashboard') {
                                  icon = <MaterialCommunityIcons name={"view-dashboard-outline"} size={size} color={color} />
                                } else if (route.route.name === 'Recordings') {
                                  icon = <Ionicons name={"ios-recording"} size={size} color={color} />
                                }else if(route.route.name === 'Live'){
                                    icon = <MaterialIcons name={"live-tv"} size={size} color={color} />
                                }else if(route.route.name === 'Settings'){
                                    icon = <Feather name={"settings"} size={size} color={color} />
                                }else if(route.route.name === 'Account'){
                                   icon =  <FontAwesome name="user-o" size={size} color={color} />  
                                }
                            
                                // You can return any component that you like here!
                                return icon

                              },
                        })}
                        
                        tabBarOptions={{
                            activeTintColor: '#169de0',
                            
                            
                            
                          }}
                        
                        
                    >
                        <Tab.Screen name="Dashboard" component={DashboardTab} />
                        <Tab.Screen  name="Recordings" component={RecordingsTab} />
                        <Tab.Screen name="Live" component={LiveTab} />  
                        <Tab.Screen name="Settings" component={LiveTab} />      
                        <Tab.Screen name="Account" component={LiveTab} />                
                    </Tab.Navigator>

                
            </SafeAreaProvider>
                
            
        )
    }
}

export default TabNavigation