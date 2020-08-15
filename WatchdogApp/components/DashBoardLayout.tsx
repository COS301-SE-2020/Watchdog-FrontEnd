import React, { Component } from 'react'
import { Layout, Text, Radio, Card, Divider, RadioGroup } from '@ui-kitten/components'
import { Alert, ScrollView } from "react-native"
import Logs from './Logs'
import { connect } from 'react-redux'

import { getSecurityLevel, updateSecurityLevel, getUserData } from '../app-redux/actions'
import CameraStatus from './CameraStatus'
import CameraStatusButtonViewAll from './cameraStatusButtonViewAll'
import CameraLogsButtonViewAll from './CameraLogsButtonViewAll'

interface propsDashBoardLayout {
    security_level: number,
    fetchSecurityLevel: Function,
    changeSecurityLevel: Function,
    updating_security_level: boolean
}

interface stateDashBoardLayout {
    armed: boolean
    recognised_only: boolean
    disarmed: boolean
    card: string
}

class DashBoardLayout extends Component<propsDashBoardLayout, stateDashBoardLayout> {
    constructor(props) {
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

    setArmed(callback = () => { }) {
        Alert.alert(
            "Change system state to Armed",
            "Notifications will be sent for all movement",
            [
                {
                    text: "Ok",
                    onPress: () => {
                        this.setState({
                            // armed: true,
                            // recognised_only: false,
                            // disarmed: false,
                            card: "success"
                        })
                        callback()
                    },
                    style: "cancel"
                },
                { text: "Cancel" }
            ],
            { cancelable: false }
        )
    }

    setRecognisedOnly(callback = () => { }) {
        Alert.alert(
            "Change system state to Recognised Only",
            "Intruders will be detected now. Add recognised personel in the profile page",
            [
                {
                    text: "Ok",
                    onPress: () => {
                        this.setState({
                            // armed: false,
                            // recognised_only: true,
                            // disarmed: false,
                            card: "warning"
                        })
                        callback()
                    },
                    style: "cancel"
                },
                { text: "Cancel" }
            ],
            { cancelable: false }
        )
    }

    setDisarmed(callback = () => { }) {
        Alert.alert(
            "Change system state to Disarmed",
            "Notifications will be switched off for all movement",
            [
                {
                    text: "Ok",
                    onPress: () => {
                        this.setState({
                            // armed: false,
                            // recognised_only: false,
                            // disarmed: true,
                            card: "danger"
                        })
                        callback()
                    },
                    style: "cancel"
                },
                { text: "Cancel" }
            ],
            { cancelable: false }
        )
    }

    componentDidMount = () => {
        this.props.fetchSecurityLevel()
    }

    render() {

        const updateLevel = (level) => {
            if (level != this.props.security_level) {
                let alerts = [this.setArmed, this.setRecognisedOnly, this.setDisarmed]
                alerts[level](() => {
                    this.props.changeSecurityLevel(level)
                })
            }
        }

        return (
            <ScrollView style={{ flex: 1 }}>
                <Divider />
                <Layout level={'2'} style={{ padding: 10 }}>
                    <Card status={this.state.card} style={{ marginBottom: 20 }}>
                        <Text status={this.state.card} category="h3" style={{ textAlign: "center", fontStyle: 'normal' }}>System State</Text>
                        <RadioGroup
                            selectedIndex={this.props.security_level}
                            onChange={updateLevel}
                        >
                            <Radio
                                style={{ margin: 2 }}
                                status='success'
                                // onChange={this.setArmed}
                                disabled={this.props.updating_security_level}
                            >
                                {() => <Text status='success' category={"h3"} style={{ fontSize: 15 }}> Armed</Text>}
                            </Radio>
                            <Radio
                                style={{ margin: 2 }}
                                status='warning'
                                // onChange={this.setRecognisedOnly}
                                disabled={this.props.updating_security_level}
                            >
                                {() => <Text status='warning' category={"h3"} style={{ fontSize: 15 }}> Recognised Only</Text>}
                            </Radio>
                            <Radio
                                style={{ margin: 2 }}
                                status='danger'
                                // onChange={this.setDisarmed}
                                disabled={this.props.updating_security_level}
                            >
                                {() => <Text status='danger' category={"h3"} style={{ fontSize: 15 }}> Disarmed</Text>}
                            </Radio>
                        </RadioGroup>
                    </Card>
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
                </Layout>
            </ScrollView>
        )
    }
}

const mapStoreToProps = (store) => ({
    security_level: parseInt(store.Data.preferences.security_level),
    updating_security_level: store.UI.SecurityLevel.updating
})

const mapDispatchToProps = (dispatch) => ({
    fetchSecurityLevel: () => dispatch(getSecurityLevel()),
    changeSecurityLevel: (security_level) => dispatch(updateSecurityLevel(security_level))
})

export default connect(mapStoreToProps, mapDispatchToProps)(DashBoardLayout)