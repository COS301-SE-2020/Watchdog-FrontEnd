import React, { Component } from 'react'
import { Button, Icon, List, ListItem, Divider, Text } from '@ui-kitten/components'
import { connect } from 'react-redux'

import { getControlPanel } from '../app-redux/actions'


const Data = new Array(8).fill({
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

interface propsCameraStatus {
    cameras: CameraObject[]
    sites: string[]
    loading: boolean
    load: Function
    online: object
}

interface stateCameraStatus {
    data: cameraStatus[]
}

class CameraStatus extends Component<propsCameraStatus, stateCameraStatus> {

    constructor(props: any) {
        super(props)
        this.state = {
            data: Data
        }

        this.renderItem = this.renderItem.bind(this)
    }

    componentDidMount = () => {
        this.props.load()
    }

    renderItem(item) {
        // console.log(item.item);
        let status = ""

        if(item.item.site in Object.keys(this.props.online)) {
            if(item.item.id in this.props.online[item.item.site]) {
                status = "Online"
            }
        }
        
        return (
            <ListItem
                title={`${item.item.location}`}
                //accessoryRight={item.item.status==='Online'?renderItemIconOnline : renderItemIconOfline}
                accessoryLeft={() => <Text style={{ paddingRight: 20 }}>{item.index + 1}</Text>}
                //accessoryRight={evaProps => <Icon  {...evaProps} name={item.item.status==='Online'?'video-outline' : 'video-off-outline'}/>}
                accessoryRight={evaProps => <Button status={status === 'Online' ? 'success' : 'danger'} accessoryRight={evaProps => <Icon  {...evaProps} name={item.item.status === 'Online' ? 'video-outline' : 'video-off-outline'} />}>
                    {''}
                </Button>}
            />
        )
    }

    render() {
        return (
            <List
                refreshing={this.props.loading}
                onRefresh={() => this.props.load()}
                ItemSeparatorComponent={Divider}
                style={{ maxHeight: 280 }}
                data={this.props.cameras}
                renderItem={this.renderItem}
            />
        )
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
)(CameraStatus)