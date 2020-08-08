import React from 'react'
import { useNavigation } from "@react-navigation/native"
import { Layout, Icon, Button } from "@ui-kitten/components"
const SettingsIcon = (props) => (
    <Icon {...props} name='settings-2'/>
)


function SettingsButton(props) {
    const navigation = useNavigation()
    return (
        <Button  appearance='ghost' status='danger' accessoryLeft={SettingsIcon} onPress={
            () => {
                console.log('Header Pressed!')
                navigation.navigate('Settings')
            }
        } />
    );
}

export default SettingsButton;