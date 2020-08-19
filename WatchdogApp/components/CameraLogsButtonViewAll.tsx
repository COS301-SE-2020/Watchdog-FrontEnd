import React, { Component } from "react"
import { useNavigation } from "@react-navigation/native"
import { Layout, Text, Radio, Card, Divider, Button } from '@ui-kitten/components'
const CameraLogsButtonViewAll = () => {
    const navigation = useNavigation()
    return <Button appearance='ghost' status='info' onPress={() => {
        console.log("help")
        navigation.navigate({ name: 'Logs', key: 'Logs' })
    }}
    >
        View All
        </Button>
}

export default CameraLogsButtonViewAll