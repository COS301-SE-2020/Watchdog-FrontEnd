import React from 'react';
import { useNavigation } from "@react-navigation/native"
import { Layout, Text, Radio, Card, Divider, Button } from '@ui-kitten/components'
function CancelNewIdentityButton(props) {
    const navigation = useNavigation()
    return <Button style={{margin: 2, height: 30,width:"50%" }} appearance='outline' status='danger' onPress={() => {
                                                                        console.log("help")
                                                                        navigation.goBack()}} 
            >Cancel</Button>
}

export default CancelNewIdentityButton;