import React, { Component } from "react";
import HeaderBar from "./HeaderBar"
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import SettingsTab from "./SettingsTab";
import { Layout, Icon, Button } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context"
import CameraStatus from './CameraStatus'
import SettingsButton from './SettingsButton'
import CameraStatusScreen from './CameraStatusScreen'
import CameraLogsScreen from './CameraLogsScreen'

interface TabProps {
    tabContent: any,
    title: string,
}
const SettingsIcon = (props) => (
    <Icon {...props} name='settings-2'/>
);
const Stack = createStackNavigator();

class CustomTab extends Component<TabProps> {
    constructor(props: any) {
        super(props)
    }

    render() {

        const settingsbtn = () => {
            const navigation = useNavigation()
            return <Button  appearance='ghost' status='danger' accessoryLeft={SettingsIcon} onPress={
                () => {
                    console.log('Header Pressed!')
                    navigation.navigate('Settings')
                }
            } />
        }
       
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name={this.props.title}
                    component={()=>this.props.tabContent}
                    options={{
                        headerShown: true,
                        headerRight : ()=> <SettingsButton />

                
                    }}
                />
                <Stack.Screen name='Settings' component={SettingsTab} options={{ headerShown: false }} />
                <Stack.Screen name='Camera' component={CameraStatusScreen} options={{ headerShown: true, title: 'Camera Status' }} />
                <Stack.Screen name='Logs' component={CameraLogsScreen} options={{ headerShown: true, title: 'Camera Logs' }} />
            </Stack.Navigator>


        )
    }
}

export default CustomTab