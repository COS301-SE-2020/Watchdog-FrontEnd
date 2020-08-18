import React, { Component } from 'react';
import { Button, Icon, List, ListItem, Divider, Text, Layout } from '@ui-kitten/components'

import { connect } from 'react-redux'

import { getControlPanel } from '../app-redux/actions'

const Data = new Array(100).fill({
    location: 'Bedroom',
    status: 'Online',
})

interface cameraStatus {
    location: string
    status: string
}

interface CameraObject {
    address: string
    path: string
    port: string
    protocol: string
    site: string
    location: string
    id: string
}

interface propsCameraStatusScreen {
    cameras: CameraObject[]
    sites: string[]
    loading: boolean
    load: Function
    online: object
}

interface stateCameraStatusScreen {
    data: cameraStatus[]
}

class CameraStatusScreen extends Component<propsCameraStatusScreen, stateCameraStatusScreen> {
    constructor(props: any) {
        super(props)
    }

    componentDidMount = () => {
        this.props.load()
    }

    render() {

        const renderItem = (item) => {
            let status = ""

            if (item.item.site in Object.keys(this.props.online)) {
                if (item.item.id in this.props.online[item.item.site]) {
                    status = "Online"
                }
            }

            return (
                <ListItem
                    title={`${item.item.location}`}
                    accessoryLeft={() => <Text style={{ paddingRight: 20 }}>{item.index + 1}</Text>}
                    accessoryRight={evaProps => <Button status={status === 'Online' ? 'success' : 'danger'} accessoryRight={evaProps => <Icon  {...evaProps} name={item.item.status === 'Online' ? 'video-outline' : 'video-off-outline'} />}>
                        {''}
                    </Button>}
                />
            )
        }

        return (
            <Layout style={{ flex: 1 }}>
                <List
                    refreshing={this.props.loading}
                    onRefresh={() => this.props.load()}
                    ItemSeparatorComponent={Divider}
                    data={this.props.cameras}
                    renderItem={renderItem}
                />
            </Layout>

        );
    }
}


export default connect(
    (store) => ({
        cameras: store.Data.camera_objects,
        sites: store.Data.sites,
        loading: store.UI.ControlPanel.loading,
        online: store.Live.producers
    }),
    (dispatch) => ({
        load: () => dispatch(getControlPanel())
    })
)(CameraStatusScreen)