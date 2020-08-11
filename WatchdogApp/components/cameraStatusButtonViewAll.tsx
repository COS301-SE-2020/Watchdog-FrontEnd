import React, { Component } from "react"
import { useNavigation } from "@react-navigation/native"
import { Layout, Text, Radio, Card, Divider, Button } from '@ui-kitten/components'
const CameraStatusButtonViewAll = () => {
    const navigation = useNavigation()
    return <Button appearance='outline' status='info' onPress={() => {
                                                                        console.log("help")
                                                                        navigation.navigate({ name: 'Camera', key: 'Camera' })}} 
            >View All</Button>
}

export default CameraStatusButtonViewAll