import React, { Component, Dispatch, useEffect, useState } from "react"
import { produce } from 'immer'
import { StyleSheet, View } from "react-native"
import { Video } from 'expo-av'
import moment from 'moment'
import { Card, List, Layout, Avatar, Text, Drawer, DrawerGroup, Divider, Datepicker, CheckBox, Select, SelectItem, IndexPath, Button, Modal } from "@ui-kitten/components"
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
            toPlay: ''
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
        const renderVideoHeader = (headerProps, info) => (
            <Layout style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
                <Layout>
                    <Avatar
                        source={
                            (info.item.tag == 'periodic') ?
                                require('../assets/clock.png')
                                : (info.item.tag == 'intruder') ?
                                    require('../assets/thief.png')
                                    : require('../assets/travel.png')
                        }
                        style={{ marginRight: 20 }}
                    />
                </Layout>
                <Layout>
                    <Text category='h6'>{convertTime(info.item.metadata.timestamp)}</Text>
                </Layout>
            </Layout>
        )

        const renderVideoFooter = (footerProps, info) => (
            <Text category="label" style={{ padding: 20 }}>{info.item.location.toUpperCase()}</Text>
        )

        const renderVideo = (info) => {
            return <React.Fragment>
                <Card
                    style={styles.item}
                    status={(info.item.tag == 'periodic') ? 'basic' : (info.item.tag == 'intruder') ? 'danger' : 'warning'}
                    header={headerProps => renderVideoHeader(headerProps, info)}
                    footer={footerProps => renderVideoFooter(footerProps, info)}
                >
                    <Button style={{ margin: 2, height: 30 }} appearance='outline' status='success' onPress={() => this.setState({ modal: true, toPlay: info.item.path_in_s3 })}>Play</Button>
                    {/* <VideoPlayer
                        width={300}
                        height ={300}
                        videoProps={{
                            shouldPlay: false,
                            resizeMode: Video.RESIZE_MODE_CONTAIN,
                            source: {
                            uri: info.item.path_in_s3,
                            },
                        }}
                        inFullscreen={false}
                        /> */}
                    <Divider style={{ margin: 5, backgroundColor: 'transparent' }} />
                </Card>
            </React.Fragment>
        }



        const VideoFilter = () => {
            const filterVideoByTag = (checkBox, obj) => {
                this.setState(
                    produce(
                        draft => {
                            draft.filters[checkBox] = obj
                        }
                    ),
                    () => this.props.updateFilters(this.state.filters, this.props.videos)
                )
            }

            const groupDisplayValues = () => {
                return this.state.filters.location.map(index => {
                    return this.props.locations[index.row]
                })
            }

            const filterVideoByLocation = (obj) => {
                this.setState(
                    produce(draft => {
                        draft.filters.location = obj
                    }),
                    () => this.props.updateFilters({
                        ...this.state.filters,
                        location: obj.map((index) => this.props.locations[index.row])
                    }, this.props.videos)
                )
            }

            const changeDateRange = (fromDate, toDate) => {
                this.setState(
                    produce(
                        draft => {
                            draft.filters.fromDate = fromDate
                            draft.filters.toDate = toDate
                        }
                    ),
                    () => this.props.updateFilters(this.state.filters, this.props.videos)
                )
            }

            const SelectRange = () => (
                <React.Fragment>
                    <Layout style={styles.filterLayout}>
                        <Layout style={{ alignContent: 'center', width: '50%' }}>
                            <Datepicker style={styles.input} max={new Date()} label="From:" date={this.state.filters.fromDate} onSelect={(obj) => { changeDateRange(obj, this.state.filters.toDate) }} />
                            <Datepicker style={styles.input} max={new Date()} label="To:" date={this.state.filters.toDate} onSelect={obj => changeDateRange(this.state.filters.fromDate, obj)} />
                        </Layout>
                        <Layout style={{ alignContent: 'center', width: '50%' }}>
                            <Text style={{ paddingBottom: 15 }} category='label'>Video Tags:</Text>
                            <CheckBox style={{ paddingBottom: 15 }} checked={this.state.filters.intruder} onChange={nextChecked => filterVideoByTag("intruder", nextChecked)}>Intruder</CheckBox>
                            <CheckBox style={{ paddingBottom: 15 }} checked={this.state.filters.periodic} onChange={nextChecked => filterVideoByTag('periodic', nextChecked)}>Periodic</CheckBox>
                            <CheckBox checked={this.state.filters.movement} onChange={nextChecked => filterVideoByTag('movement', nextChecked)}>Suspicious</CheckBox>
                        </Layout>
                    </Layout>
                    <Layout style={{ margin: 20 }}>
                        <Select
                            style={styles.input}
                            label='Select Location to Filter'
                            onSelect={(obj) => filterVideoByLocation(obj)}
                            value={groupDisplayValues().join(',')}
                            selectedIndex={this.state.filters.location}
                            multiSelect={true}
                        >
                            {
                                this.props.locations.map((key, index) => (<SelectItem key={index} title={key} />))
                            }
                        </Select>
                    </Layout>
                </React.Fragment>
            )

            return <React.Fragment>
                <Layout>
                    <Drawer>
                        <DrawerGroup title='Filters'>
                            <SelectRange />
                        </DrawerGroup>
                    </Drawer>
                </Layout>
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
                            backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        >
                            <Card disabled={true}>
                                <Video
                                    source={{ uri: this.state.toPlay }}
                                    rate={1.0}
                                    isMuted={true}
                                    resizeMode="cover"
                                    shouldPlay
                                    style={{ width: 300, height: 300 }}
                                    useNativeControls
                                />
                                <Divider style={{ margin: 5, backgroundColor: 'transparent' }} />
                                <Button style={{ margin: 2, height: 30 }} appearance='outline' status='danger' onPress={() => this.setState({ modal: false })}>DISMISS</Button>
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
        // paddingHorizontal: 8,
        // paddingVertical: 4,
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
    }
});

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
