import React, { Component } from 'react';
import { Layout, Button, Card, Divider, Text, List, Modal, Input } from '@ui-kitten/components'
import { Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { getDetected } from '../app-redux/actions'

const styles = StyleSheet.create({
    
    backdropStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        height : '100%'
    },
    Cards: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
    
        

        borderRadius: 0,
        marginTop: 75,

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
})

interface DetectedFrame {

}

interface propsDetectedScreen {
    detected: DetectedFrame[],
    loading: boolean,
    load: Function
}

interface stateDetectedScreen {
    addModal: Boolean
    name: String
}

class DetectedScreen extends Component<propsDetectedScreen, stateDetectedScreen> {
    constructor(props: any) {
        super(props)
        this.state = {
            addModal: false,
            name: ''
        }
    }

    componentDidMount = () => {
        this.props.load()
        this.addIdentity = this.addIdentity.bind(this)
    }

    async addIdentity(){
        //Adding the stuff goes here
        this.setState({ addModal: false, name: '' })

    }

    render() {

        let renderIdentity = (info) => (
            <Card status='basic' >
                <Text category='h5'>{info.item.name}</Text>
                <Divider style={{ margin: 5, backgroundColor: 'transparent' }} />
                <Layout style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        style={{
                            width: 300,
                            height: 300,
                            resizeMode: 'stretch'
                        }}
                        source={{
                            uri: info.item.url,
                        }}
                    />
                </Layout>

                <Divider style={{ margin: 5, backgroundColor: 'transparent' }} />
                <Button appearance='outline' status='warning' onPress={(something) => this.setState({ addModal: true })}>Add to Whitelist</Button>
            </Card>
        )

        return (
            <Layout style={{ flex: '1' }}>
                <List
                    refreshing={this.props.loading}
                    keyExtractor={(item) => item.index}
                    onRefresh={() => this.props.load()}
                    data={this.props.detected}
                    renderItem={renderIdentity}
                />


                <Modal
                    visible={this.state.addModal}
                    style={styles.backdropStyle}
                    onBackdropPress={() => this.setState({ addModal: false, name: '' })}>
                    <Card style={styles.Cards}
                        
                        header={header => (
                            <Text
                                {...header}

                                category='label'
                                status='basic'
                            >
                                Add Detected Image To Identity
                            </Text>
                        )}
                    >
                        <Input
                            placeholder='Identity Name'
                            value={this.state.name}
                            style={{ width: 300, marginBottom: 5 }}
                            onChangeText={nextValue => this.setState({ name: nextValue })}
                        />
                        <Layout style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Button onPress={() => this.setState({ addModal: false, name: '' })} style={{ margin: 2, height: 30, width: "50%" }} appearance='outline' status='danger'>
                                DISMISS
                        </Button>
                            <Button onPress={this.addIdentity} style={{ margin: 2, height: 30, width: "50%" }} appearance='outline' status='success' >
                                Add
                        </Button>
                        </Layout>
                    </Card>
                </Modal>
            </Layout>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    load: () => dispatch(getDetected())
})

const mapStoreToProps = (store) => ({
    detected: store.Data.frames,
    loading: store.UI.Detected.loading
})

export default connect(mapStoreToProps, mapDispatchToProps)(DetectedScreen)