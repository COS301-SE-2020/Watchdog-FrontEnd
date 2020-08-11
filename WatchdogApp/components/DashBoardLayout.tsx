import React, { Component } from 'react'
import { Layout, Text, Radio, Card, Divider, Button } from '@ui-kitten/components'
import { Alert, ScrollView, FlatList } from "react-native"
import CameraStatus from './CameraStatus'
import CustomTab from './CustomTab'
import { Auth } from 'aws-amplify'
import Logs from './Logs'
import CameraStatusButtonViewAll from './cameraStatusButtonViewAll'
import CameraLogsButtonViewAll from './CameraLogsButtonViewAll' 

interface propsDashBoardLayout {

}

interface stateDashBoardLayout {
    armed: boolean
    recognised_only: boolean
    disarmed: boolean
    card: string
}

class DashBoardLayout extends Component<propsDashBoardLayout, stateDashBoardLayout> {
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
        
        
        return (
            <ScrollView style={{flex:1}}>
                                    
                <Divider />
                <Layout level={'2'} style={{ padding: 10 }}>
                    <Card status={this.state.card} style={{ marginBottom: 20 }} >
                        <Text status={this.state.card} category="h3" style={{ textAlign: "center", fontStyle: 'normal' }}>System State</Text>

                        <Radio

                            style={{ margin: 2 }}
                            status='success'
                            checked={this.state.armed}
                            onChange={this.setArmed}
                        >

                            {() => <Text status='success' category={"h3"} style={{ fontSize: 15 }}> Armed</Text>}


                        </Radio>

                        <Radio
                            style={{ margin: 2 }}
                            status='warning'
                            checked={this.state.recognised_only}
                            onChange={this.setRecognisedOnly}

                        >
                            {() => <Text status='warning' category={"h3"} style={{ fontSize: 15 }}> Recognised Only</Text>}



                        </Radio>

                        <Radio
                            style={{ margin: 2 }}
                            status='danger'
                            checked={this.state.disarmed}
                            onChange={this.setDisarmed}

                        >


                            {() => <Text status='danger' category={"h3"} style={{ fontSize: 15 }}> Disarmed</Text>}

                        </Radio>
                    </Card>
                    {/* <Divider style={{paddingVertical : 10}}/> */}

                    <Card status='primary' style={{ marginBottom: 20 }} >
                        <Text status='primary' category="h3" style={{ textAlign: "center", fontStyle: 'normal' }}>Camera Status</Text>

                        <CameraStatus />
                        <CameraStatusButtonViewAll />
                        
                        

                    </Card>



                    <Card status='info'>
                        <Text status='info' category="h3" style={{ textAlign: "center", fontStyle: 'normal' }}>Camera Logs</Text>
                        <Logs />
                        <CameraLogsButtonViewAll />
                    </Card>


                    
                    <Button
                        

                        onPress={() => Auth.signOut()}
                    >Logout </Button>
                </Layout>
                {/* <Divider style={{padding:50}}/> */}
                
            </ScrollView>
        );
    }
}

export default DashBoardLayout