import React from 'react';
import { Layout, Button, Card, Divider, Text } from '@ui-kitten/components'
import { useNavigation } from "@react-navigation/native"

function AddNewIdentityButton(props) {
    const navigation = useNavigation()

    return (
        <Button  appearance='outline' status='success'  onPress={() => {
            console.log("help")
            navigation.navigate({ name: 'Add_Identity', key: 'Add_Identity' })}}>New Identity</Button>
    );
}

export default AddNewIdentityButton