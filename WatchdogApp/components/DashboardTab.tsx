import React, { Component } from "react"
import { Alert, ScrollView, FlatList } from "react-native"
import { Auth } from 'aws-amplify'
import { Layout, Text, Radio, Card, Divider, Button } from '@ui-kitten/components'
import CameraStatus from './CameraStatus'
import CustomTab from './CustomTab'
import Logs from './Logs'
import { createStackNavigator } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"
import DashBoardLayout from './DashBoardLayout'
import { NavigationContainer } from '@react-navigation/native'
const Stack = createStackNavigator();
interface propsDashboard {

}

interface stateDashboard {
    armed: boolean
    recognised_only: boolean
    disarmed: boolean
    card: string
}


class DashboardTab extends Component<propsDashboard, stateDashboard> {
    constructor(props: any) {
        super(props);

        this.state = {
            armed: true,
            recognised_only: false,
            disarmed: false,
            card: "success"
        }

        this.setArmed = this.setArmed.bind(this)
        this.setRecognisedOnly = this.setRecognisedOnly.bind(this)
        this.setDisarmed = this.setDisarmed.bind(this)
    }

    setArmed() {

        Alert.alert(
            "Change system state to Armed",
            "Notifications will be sent for all movement",
            [
                {
                    text: "Ok",
                    onPress: () => {
                        this.setState({
                            armed: true,
                            recognised_only: false,
                            disarmed: false,
                            card: "success"
                        })
                    },
                    style: "cancel"
                },
                { text: "Cancel" }
            ],
            { cancelable: false }
        );

    }

    setRecognisedOnly() {

        Alert.alert(
            "Change system state to Recognised Only",
            "Intruders will be detected now. Add recognised personel in the profile page",
            [
                {
                    text: "Ok",
                    onPress: () => {
                        this.setState({
                            armed: false,
                            recognised_only: true,
                            disarmed: false,
                            card: "warning"
                        })
                    },
                    style: "cancel"
                },
                { text: "Cancel" }
            ],
            { cancelable: false }
        );

    }

    setDisarmed() {

        Alert.alert(
            "Change system state to Disarmed",
            "Notifications will be switched off for all movement",
            [
                {
                    text: "Ok",
                    onPress: () => {
                        this.setState({
                            armed: false,
                            recognised_only: false,
                            disarmed: true,
                            card: "danger"
                        })
                    },
                    style: "cancel"
                },
                { text: "Cancel" }
            ],
            { cancelable: false }
        );

    }

    render() {
        const cameraStatusButtonViewAll = () => {
            const navigation = useNavigation()
            return <Button appearance='outline' status='primary' onPress={() => navigation.navigate('Camera Status')} >View All</Button>
        }
        
        return (
            <CustomTab
                title="Dashboard"
                tabContent={
                    
                    <DashBoardLayout />
                        
                    
                }
            />


        );
    }
}

export default DashboardTab;