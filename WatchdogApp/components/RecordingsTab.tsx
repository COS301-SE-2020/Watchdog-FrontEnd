import React, { Component, Dispatch, useEffect, useState } from "react"
import { produce } from 'immer'
import { StyleSheet, View } from "react-native"
import { Video } from 'expo-av'
import moment from 'moment'
import { Card, List, Layout, Avatar, Text, Drawer, DrawerGroup, Divider, Datepicker, CheckBox, Select, SelectItem, IndexPath, Button, Modal, Icon } from "@ui-kitten/components"
import { connect } from 'react-redux'

import CustomTab from "./CustomTab"
import { getRecordings } from '../app-redux/actions'

//Dynamically create dummy data
const dummyData = Array.from({ length: 3 }, (_, index) => (
    {
        aid: index,
        path_in_s3: "somepath",
        location: `Location ${index}`,
        timestamp: moment.unix(1593568800 + index * 24 * 60 * 60).format("ddd, MM/DD/YY, hh:mm a")
    }
))

const convertTime = (timestamp) => moment.unix(timestamp).format("ddd, MM/DD/YY, hh:mm a")
const reverseConvertDate = (timestampString) => moment.unix(timestampString).toDate()

interface VideoObject {
    aid: number
    metadata: {
        camera_id: string
        timestamp: number
    }
    path_in_s3: string
    tag: string
    location: string
}

interface RecordingsTabProps {
    load: Function
    videos: Array<VideoObject>
    loading: boolean
    locations: []
    updateFilters: Function
    filteredVideos: Array<VideoObject>
}

interface RecordingsTabState {
    filters: {
        intruder: boolean,
        periodic: boolean,
        movement: boolean,
        location: IndexPath[],
        fromDate: Date | null,
        toDate: Date | null

    },
    modal: boolean,
    toPlay: string
    location: string
    timestamp: string
    tag: string
}

class RecordingsTab extends Component<RecordingsTabProps, RecordingsTabState> {
    constructor(props: any) {
        super(props);
        this.state = {
            filters: {
                intruder: true,
                periodic: true,
                movement: true,
                location: [],
                fromDate: null,
                toDate: null
            },
            modal: false,
            toPlay: '',
            location: '',
            timestamp: '',
            tag: ''
        }
    }

    componentDidMount = () => {
        this.props.load()

        setTimeout(() => {
            this.setState(produce(draft => {
                draft.showVideos = [...this.props.videos]
                draft.filters.location = this.props.locations.map((value, index) => new IndexPath(index))
            }))
        }, 5000)
    }

    render() {
        const renderVideoFooter = (headerProps, info) => (
            <Text {...headerProps} category="label" style={{ padding: 20 }}>Location: {info.item.location.toUpperCase()}</Text>
        )

        const renderVideo = (info) => {

            const CustomAvatar = (props, tag) => (
                <Avatar
                    {...props}
                    source={
                        (tag == 'periodic') ?
                            require('../assets/clock.png')
                            : (tag == 'intruder') ?
                                require('../assets/thief.png')
                                : require('../assets/travel.png')
                    }
                    style={{ marginRight: 20 }}
                    size='tiny'
                />
            )

            const PlayIcon = (props) => (
                <Icon
                    {...props}
                    name='play-circle'
                />
            )

            const openModal = ({ path_in_s3, location, tag, metadata }) => {
                this.setState({ modal: true, toPlay: path_in_s3, location, tag, timestamp: metadata.timestamp })
            }

            return <React.Fragment>
                <Card
                    style={styles.Cards}
                    status={(info.item.tag == 'periodic') ? 'basic' : (info.item.tag == 'intruder') ? 'danger' : 'warning'}
                    footer={footerProps => renderVideoFooter(footerProps, info)}
                    onPress={() => openModal(info.item)}
                >
                    <Button
                        appearance='ghost'
                        status={(info.item.tag == 'periodic') ? 'basic' : (info.item.tag == 'intruder') ? 'danger' : 'warning'}
                        accessoryLeft={
                            (props) => CustomAvatar(props, info.item.tag)
                        }
                        accessoryRight={
                            (props) => PlayIcon(props)
                        }
                        onPress={() => openModal(info.item)}
                    >
                        {convertTime(info.item.metadata.timestamp)}
                    </Button>
                </Card>
            </React.Fragment>
        }



        const VideoFilter = () => {
            return <React.Fragment>
            </React.Fragment>
        }


        return (
            <CustomTab
                title="Recordings"
                tabContent={
                    <React.Fragment>
                        <VideoFilter />
                        <List
                            refreshing={this.props.loading}
                            keyExtractor={(item) => item.aid}
                            onRefresh={() => this.props.load()}
                            style={styles.container}
                            contentContainerStyle={styles.contentContainer}
                            data={this.props.filteredVideos}
                            renderItem={renderVideo}
                        />
                        <Modal
                            visible={this.state.modal}
                            onBackdropPress={() => this.setState({ modal: false, toPlay: '' })}
                            backdropStyle={styles.backdropStyle}
                        >
                            <Card
                                style={styles.Cards}
                                status={(this.state.tag == 'periodic') ? 'basic' : (this.state.tag == 'intruder') ? 'danger' : 'warning'}
                                header={
                                    headerProps => (
                                        <Text
                                            {...headerProps}
                                            category='label'
                                            status={
                                                (this.state.tag == 'periodic') ?
                                                    'basic'
                                                    : (this.state.tag == 'intruder') ?
                                                        'danger'
                                                        : 'warning'
                                            }
                                        >
                                            {convertTime(this.state.timestamp)}
                                        </Text>
                                    )
                                }
                                footer={
                                    footerProps => (
                                        renderVideoFooter(footerProps, { item: this.state })
                                    )
                                }
                                disabled={true}
                            >
                                <Video
                                    source={{ uri: this.state.toPlay }}
                                    rate={1.0}
                                    isMuted={true}
                                    resizeMode="cover"
                                    shouldPlay
                                    style={{ width: 300, height: 300 }}
                                    useNativeControls
                                />
                                <Button
                                    style={{ margin: 2, height: 30 }}
                                    appearance='ghost'
                                    status='danger'
                                    onPress={
                                        () => this.setState({ modal: false, toPlay: '' })
                                    }
                                >
                                    DISMISS
                                </Button>
                            </Card>
                        </Modal>
                    </React.Fragment>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    contentContainer: {
    },
    item: {
        padding: 0,
        margin: 10
    },
    input: {
        marginRight: 20,
    },
    filterLayout: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        alignContent: 'center'
    },
    backdropStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
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

const mapStateToProps = (store, ownProps) => {
    return {
        videos: store.Data.videos,
        locations: store.Data.camera_locations,
        loading: store.UI.Recordings.loading,
        message: store.UI.Recordings.message,
        filteredVideos: store.UI.Recordings.filteredVideos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: () => dispatch(getRecordings()),
        updateFilters: (data, videos) => dispatch({
            type: 'FILTER_RECORDINGS',
            data,
            videos
        })
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(RecordingsTab);
