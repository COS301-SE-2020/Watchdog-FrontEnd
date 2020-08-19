import React from 'react';
import { Layout, Button, Card, Divider, Text, Icon } from '@ui-kitten/components'
import { useNavigation } from "@react-navigation/native"

function AddNewIdentityButton(props) {
    const navigation = useNavigation()

    const AddIcon = (props) => (
        <Icon {...props} name='plus-circle' />
    )

    return (
        <Button
            appearance='ghost'
            status='success'
            onPress={() => {
                // console.log("help")
                navigation.navigate({ name: 'Add_Identity', key: 'Add_Identity' })
            }}
            accessoryLeft={AddIcon}
        >
            Add New Identity
        </Button>
    )
}

export default AddNewIdentityButton