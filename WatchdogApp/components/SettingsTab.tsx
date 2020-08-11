import React, { Component } from "react"
import { Layout, Icon, Menu, MenuItem, Select, SelectItem, Input } from '@ui-kitten/components'
import moment from 'moment'
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import  { Auth } from 'aws-amplify'

//Dynamically create dummy data
const dummyData = Array.from({ length: 10 }, (_, index) => (
    {
        path_in_s3: "somepath",
        location: `Location ${index}`,
        timestamp: moment.unix(1593568800 + index * 24 * 60 * 60).format("dddd, MMMM Do YYYY, hh:mm a")
    }
))
const IdentityIcon = (props) => (
    <Icon {...props} name='people-outline' />
);

const PasswordIcon = (props) => (
    <Icon {...props} name='alert-triangle-outline' />
);

const LogoutIcon = (props) => (
    <Icon {...props} name='log-out-outline' />
);

const NotificationsIcon = (props) => (
    <Icon {...props} name='bell-outline' />
);
const HistoricalIcon = (props) => (
    <Icon {...props} name='film-outline' />
);
const AccountIcon = (props) => (
    <Icon {...props} name='at-outline' />
);
const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward' />
);

interface SettingProps {
    title: string,
    accessoryLeft: any,
    onPress?: Function
}


const Setting = (props: SettingProps) => {
    return <MenuItem {...props} accessoryRight={ForwardIcon} />
}

function SettingsTab(props) {
    const navigation = useNavigation()
    return (
        
            <Layout style={{flex:1}}>

                 <Menu>
                     <Setting title='Notifications' accessoryLeft={NotificationsIcon} onPress={() => navigation.navigate({ name: 'Notifications', key: 'Notifications' })} />
                     <Setting title='Historical Video' accessoryLeft={HistoricalIcon} onPress={() => navigation.navigate({ name: 'Historical', key: 'Historical' })} />
                     <Setting title='Identity Settings' accessoryLeft={IdentityIcon} onPress={() => navigation.navigate({ name: 'Identities', key: 'Identities' })} />
                     <Setting title='Password Settings' accessoryLeft={PasswordIcon} onPress={() => navigation.navigate({ name: 'Password', key: 'Password' })} />
                     <Setting title='Account Information' accessoryLeft={AccountIcon} onPress={() => navigation.navigate({ name: 'Account', key: 'Account' })} />
                     <Setting title='Logout' accessoryLeft={LogoutIcon} onPress={() => Auth.signOut()} />
                     {/* <Setting title='Historical Content' accessoryLeft={HistoricalIcon}   />
                     <Setting title='Security Level' accessoryLeft={SecurityLevelIcon} /> */}
                 </Menu>
             </Layout>            
    
    );
}

export default SettingsTab;


const styles = {
    container: {}
}

