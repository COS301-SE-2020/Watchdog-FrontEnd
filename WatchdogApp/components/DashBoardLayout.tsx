import React, { Component } from 'react'
import { Layout, Text, Radio, Card, Divider, RadioGroup } from '@ui-kitten/components'
import { Alert, ScrollView, View } from "react-native"
import Logs from './Logs'
import { connect } from 'react-redux'

import { getSecurityLevel, updateSecurityLevel } from '../app-redux/actions'
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
                <Layout
                    level={'2'}
                    // style={{ padding: 10 }}
                >
                    <Card
                        status={this.state.card}
                        style={styles.Cards}
                        header={
                            (props) => (
                                <View {...props}>
                                    <Text style={styles.CardHeading} category='h5'>System Status</Text>
                                </View>
                            )
                        }
                    >
                        {/* <Text category="h3" style={{ textAlign: "center", fontStyle: 'normal' }}>System State</Text> */}
                        <RadioGroup
                            selectedIndex={this.props.security_level}
                            onChange={updateLevel}
                        >
                            <Radio
                                style={styles.Radio}
                                status='danger'
                                disabled={this.props.updating_security_level}
                            >
                                {() => <Text status='danger' category='label' style={styles.RadioText}>Disarmed</Text>}
                            </Radio>
                            <Radio
                                style={styles.Radio}
                                status='warning'
                                disabled={this.props.updating_security_level}
                            >
                                {() => <Text status='warning' category='label' style={styles.RadioText}>Recognised Only</Text>}
                            </Radio>
                            <Radio
                                style={styles.Radio}
                                status='success'
                                disabled={this.props.updating_security_level}
                            >
                                {() => <Text status='success' category='label' style={styles.RadioText}>Armed</Text>}
                            </Radio>
                        </RadioGroup>
                    </Card>
                    <Card
                        style={styles.Cards}
                        header={
                            (props) => (
                                <View {...props}>
                                    <Text style={styles.CardHeading} category='h5'>Camera Status</Text>
                                </View>
                            )
                        }
                        footer = {
                            () => <CameraStatusButtonViewAll />
                        }
                    >
                        <CameraStatus />
                    </Card>
                    <Card
                        style={styles.Cards}
                        header={
                            (props) => (
                                <View {...props}>
                                    <Text style={styles.CardHeading} category='h5'>Camera Logs</Text>
                                </View>
                            )
                        }
                        footer={
                            (props) => <CameraLogsButtonViewAll />
                        }
                    >
                        <Logs />
                    </Card>
                </Layout>
            </ScrollView>
        )
    }
}

const styles = {
    Cards: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        borderRadius: 0,

        elevation: 24,
        margin: 20,
    },
    CardHeading: {
        textAlign: "center",
    },
    Radio: {
        // margin: 2
    },
    RadioText: {
        marginLeft: 20
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