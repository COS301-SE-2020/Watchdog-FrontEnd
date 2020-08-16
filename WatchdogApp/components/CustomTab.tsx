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
import NotificationSettingsScreen from "./NotificationSettingsScreen"
import HistoricalSettingsScreen from './HistoricalSettingsScreen'
import IdentitySettingsScreen from './IdentitySettingsScreen'
import AddIdentityScreen from './AddIdentityScreen'
import PasswordSettingsScreen from './PasswordSettingsScreen'
import AccountInformationScreen from './AccountInformationScreen'
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
                <Stack.Screen name='Settings' component={SettingsTab} options={{ headerShown: true }} />
                <Stack.Screen name='Camera' component={CameraStatusScreen} options={{ headerShown: true, title: 'Camera Status' }} />
                <Stack.Screen name='Logs' component={CameraLogsScreen} options={{ headerShown: true, title: 'Camera Logs' }} />
                <Stack.Screen name='Notifications' component={NotificationSettingsScreen} options={{ headerTitle: 'Notifications', headerShown: true }} />
                <Stack.Screen name='Historical' component={HistoricalSettingsScreen} options={{ headerTitle: 'Historical ', headerShown: true }} />
                <Stack.Screen name='Identities' component={IdentitySettingsScreen} options={{ headerTitle: 'Identities ', headerShown: true }} />
                <Stack.Screen name='Add_Identity' component={AddIdentityScreen} options={{ headerTitle: 'Add Identity ', headerShown: true }} />
                <Stack.Screen name='Password' component={PasswordSettingsScreen} options={{ headerTitle: 'Password Settings ', headerShown: true }} />
                <Stack.Screen name='Account' component={AccountInformationScreen} options={{ headerTitle: 'Account Information ', headerShown: true }} />
            </Stack.Navigator>


        )
    }
}

export default CustomTab