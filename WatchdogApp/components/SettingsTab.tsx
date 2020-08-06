import React, { Component } from "react"
import { Layout, Icon, Menu, MenuItem, Select, SelectItem, Input } from '@ui-kitten/components';
import moment from 'moment'
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Dynamically create dummy data
const dummyData = Array.from({ length: 10 }, (_, index) => (
    {
        path_in_s3: "somepath",
        location: `Location ${index}`,
        timestamp: moment.unix(1593568800 + index * 24 * 60 * 60).format("dddd, MMMM Do YYYY, hh:mm a")
    }
))
const SmartphoneIcon = (props) => (
    <Icon {...props} name='smartphone-outline' />
);

const BrowserIcon = (props) => (
    <Icon {...props} name='browser-outline' />
);

const ColorPaletteIcon = (props) => (
    <Icon {...props} name='color-palette-outline' />
);

const NotificationsIcon = (props) => (
    <Icon {...props} name='star' />
);
const HistoricalIcon = (props) => (
    <Icon {...props} name='star' />
);
const SecurityLevelIcon = (props) => (
    <Icon {...props} name='star' />
);
const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward' />
);

interface SettingProps {
    title: string,
    accessoryLeft: any,
    onPress?: Function
}

const Stack = createStackNavigator()

class SettingsTab extends Component {

    state = {
        UserData: {
            preferences: {
                notifications: {
                    security_company: 'a',
                    type: 'b',
                    value: 'x'
                },
                historical: {
                    clip_interval: 10,
                    clip_length: 20
                },
                security_level: 1
            }
        }
    }

    constructor(props: any) {
        super(props);
    }

    render() {
        const preferences = { ...this.state.UserData.preferences }

        const Setting = (props: SettingProps) => {
            return <MenuItem {...props} accessoryRight={ForwardIcon} />
        }

        const MainMenu = () => {
            const navigation = useNavigation()
            return <Layout>

                <Menu>
                    <Setting title='Notifications' accessoryLeft={NotificationsIcon} onPress={() => navigation.navigate('Notifications')} />
                    <Setting title='Historical Content' accessoryLeft={HistoricalIcon}  onPress={() => navigation.navigate('Historical')} />
                    <Setting title='Security Level' accessoryLeft={SecurityLevelIcon} />
                </Menu>
            </Layout>
        }

        const NotificationMenu = () => (
            <Layout style={{ padding: 20 }}>
                <Select
                placeholder='Select your notification type.'
                // selectedIndex={selectedIndex}
                // onSelect={index => setSelectedIndex(index)}
                >
                    <SelectItem title='SMS' />
                    <SelectItem title='Email' />
                    <SelectItem title='Push Notifications' />
                </Select>

                <Input
                    value={preferences.notifications.value}
                    style={{ marginVertical: 10 }}
                    label='Your Contact Details'
                    placeholder='Place your Text'
                    caption='In case of SMS, specify your phone number.'
                // accessoryRight={renderIcon}
                // captionIcon={AlertIcon}
                // secureTextEntry={secureTextEntry}
                // onChangeText={nextValue => setValue(nextValue)}
                />

                <Input
                    value={preferences.notifications.security_company}
                    style={{ marginVertical: 10 }}
                    label='Security Company Contact Details'
                    placeholder='Place your Text'
                    caption='In case of SMS, specify your phone number.'
                // accessoryRight={renderIcon}
                // captionIcon={AlertIcon}
                // secureTextEntry={secureTextEntry}
                // onChangeText={nextValue => setValue(nextValue)}
                />


            </Layout>
        )

        const HistoricalMenu = () => (
            <Layout>
               <Input
                    value={preferences.historical.clip_interval.toString()}
                    style={{ marginVertical: 10 }}
                    label='Clip Interval'
                    // placeholder={}
                    caption='Put Description here'
                // accessoryRight={renderIcon}
                // captionIcon={AlertIcon}
                // secureTextEntry={secureTextEntry}
                // onChangeText={nextValue => setValue(nextValue)}
                /> 

                <Input
                    value={preferences.historical.clip_length.toString()}
                    style={{ marginVertical: 10 }}
                    label='Clip Length'
                    // placeholder='Place your Text'
                    caption='Put Description here'
                // accessoryRight={renderIcon}
                // captionIcon={AlertIcon}
                // secureTextEntry={secureTextEntry}
                // onChangeText={nextValue => setValue(nextValue)}
                />
            </Layout>
        )

        const SecurityMenu = () => (
            <Layout>
                
            </Layout>
        )

        return (
            // <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Main Menu' component={MainMenu} options={{ headerShown: false }} />
                <Stack.Screen name='Notifications' component={NotificationMenu} options={{ headerTitle: 'Notifications', headerShown: true }} />
                <Stack.Screen name='Historical' component={HistoricalMenu} options={{ headerTitle: 'Historical Video Footage', headerShown: true }} />
                <Stack.Screen name='Security' component={SecurityMenu} options={{ headerTitle: 'Security Level', headerShown: true }} />
            </Stack.Navigator>
            // </NavigationContainer>
        )
    }
}

const styles = {
    container: {}
}

export default SettingsTab;