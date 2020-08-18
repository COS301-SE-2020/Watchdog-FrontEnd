import React, { Component } from "react";
import { Text, Image, StyleSheet } from "react-native";
import { Layout, List, Divider, ListItem, Button, Icon } from "@ui-kitten/components";
import { connect } from 'react-redux'

import CustomTab from "./CustomTab";
import { getControlPanel } from '../app-redux/actions'

interface LiveTabProps {
    connectToFeedServer: Function
    getCameras: Function
    disconnectToFeedServer: Function
    getOnline: Function
    control_panel: Array<object>,
    cameras: CameraObject[]
    sites: string[]
    loading: boolean
    load: Function
    online: object
    feed: string
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

interface LiveTabState {
}


class LiveTab extends Component<LiveTabProps, LiveTabState> {

    constructor(props: any) {
        super(props)
    }

    componentDidMount = () => {
        this.props.load()
    }

    componentWillUnmount = () => {
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
            <CustomTab
                title="Live"
                tabContent={
                    <Layout
                        style={{ flex: '1' }}
                    >
                        <Image style={{ maxHeight: 250 }} source={(this.props.feed)? this.props.feed:require('../assets/streaming.png')} />
                        <List
                            refreshing={this.props.loading}
                            onRefresh={() => this.props.load()}
                            ItemSeparatorComponent={Divider}
                            data={this.props.cameras}
                            renderItem={renderItem}
                        />
                    </Layout>
                }
            />
        );
    }
}

export default connect(
    (store) => ({
        cameras: store.Data.camera_objects,
        sites: store.Data.sites,
        loading: store.UI.ControlPanel.loading,
        online: store.Live.producers,
        feed: store.Live.consume.frame
    }),
    (dispatch) => ({
        load: () => dispatch(getControlPanel())
    })
)(LiveTab)