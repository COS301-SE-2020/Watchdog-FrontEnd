import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text, Layout, List, Divider, ListItem, Button, Icon, Card } from "@ui-kitten/components";
import { connect } from 'react-redux'
import { Video } from 'expo-av'
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
    hcpStatus: string
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
    id: String
}


class LiveTab extends Component<LiveTabProps, LiveTabState> {

    constructor(props: any) {
        super(props)
        this.state = {
            id : ''
        }
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
                    onPress ={ ()=>{
                        this.setState({id : item.item.id})
                        console.log(item.item.id)
                    }}
                    //accessoryRight={item.item.status==='Online'?renderItemIconOnline : renderItemIconOfline}
                    accessoryLeft={() => <Text style={{ paddingRight: 20 }}>{item.index + 1}</Text>}
                    //accessoryRight={evaProps => <Icon  {...evaProps} name={item.item.status==='Online'?'video-outline' : 'video-off-outline'}/>}
                    accessoryRight={
                        evaProps => (
                            <Button
                                status={status === 'Online' ? 'success' : 'danger'}
                                appearance='ghost'
                                accessoryRight={
                                    evaProps => (
                                        <Icon  {...evaProps}
                                            appearence='ghost'
                                            name={item.item.status === 'Online' ? 'video' : 'video-off'}
                                        />
                                    )
                                }
                            >
                                {''}
                            </Button>
                        )
                    }
                />
            )
        }

        return (
            <CustomTab
                title="Live"
                tabContent={
                    <Layout
                        style={{ flex: 1 }}
                        level='2'
                    >
                        <Video
                            rate={1.0}
                            useNativeControls
                            id = {this.state.id}
                            style={{ height: 200, width: "100%" }}
                            resizeMode={this.props.feed? 'cover':'stretch'}
                            source={this.props.feed ? { uri: this.props.feed } : require('../assets/static.gif')}
                        />
                        {
                            this.props.hcpStatus === 'Connected' ?
                                this.props.feed != null ?
                                    <Text status='success' catagory='h6' style={styles.HcpStatusText}>Streaming Live</Text>
                                    :
                                    <Text status='warning' catagory='h6' style={styles.HcpStatusText}>No Stream Selected</Text>
                                :
                                <Text status='danger' catagory='h6' style={{ ...styles.HcpStatusText, backgroundColor: '#F9DDD3' }}>Disconnected from Home Control Panel</Text>
                        }
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
        // margin: 20,
    },
    CardHeading: {
        textAlign: "center",
    },
    Radio: {
        // margin: 2
    },
    RadioText: {
        marginLeft: 20
    },
    HcpStatusText: {
        padding: 20,
        textAlign: 'center'
    }
}
export default connect(
    (store) => ({
        cameras: store.Data.camera_objects,
        sites: store.Data.sites,
        loading: store.UI.ControlPanel.loading,
        online: store.Live.producers,
        feed: store.Live.consume.frame,
        hcpStatus: store.Live.status
    }),
    (dispatch) => ({
        load: () => dispatch(getControlPanel())
    })
)(LiveTab)