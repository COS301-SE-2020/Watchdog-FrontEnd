import React, { Component } from 'react';
import { Layout, Button, Card, Divider, Text, List } from '@ui-kitten/components'
import { Image } from 'react-native'
import { connect } from 'react-redux'

import { getDetected } from '../app-redux/actions'

interface DetectedFrame {

}

interface propsDetectedScreen {
    detected: DetectedFrame[],
    loading: boolean,
    load: Function
}

interface stateDetectedScreen { }

class DetectedScreen extends Component<propsDetectedScreen, stateDetectedScreen> {
    constructor(props: any) {
        super(props)
    }

    componentDidMount = () => {
        this.props.load()
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
                <Button appearance='outline' status='warning' onPress={(something) => console.log(something)}>Add to Whitelist</Button>
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