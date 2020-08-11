import React, { Component, Dispatch, useEffect } from "react"
import { produce } from 'immer'
import { StyleSheet } from "react-native"
import { Video } from 'expo-av'
import moment from 'moment'
import { Card, List, Layout, Avatar, Text, Drawer, DrawerGroup, Input, Datepicker, CheckBox, Select, SelectItem, IndexPath } from "@ui-kitten/components"
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

interface RecordingsTabProps {
    load: Function,
    videos: [],
    loading: boolean,
    locations: []
}

interface RecordingsTabState {
    showVideos: [],
    filters: {
        intruder: boolean,
        periodic: boolean,
        movement: boolean,
        location: IndexPath[],
        fromDate: Date | null,
        toDate: Date | null
    }
}

class RecordingsTab extends Component<RecordingsTabProps, RecordingsTabState> {
    constructor(props: any) {
        super(props);
        this.state = {
            showVideos: [...this.props.videos],
            filters: {
                intruder: true,
                periodic: true,
                movement: true,
                location: this.props.locations.map((value, index) => new IndexPath(index)),
                fromDate: null,
                toDate: null
            }
        }

    }

    componentDidMount = () => {
        this.props.load()
        // console.log(this.props.locations);
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
        const renderVideo = (info) => (
            <React.Fragment>
                <Card
                    style={styles.item}
                    status={(info.item.tag == 'periodic') ? 'basic' : (info.item.tag == 'intruder') ? 'danger' : 'warning'}
                    header={headerProps => renderVideoHeader(headerProps, info)}
                    footer={footerProps => renderVideoFooter(footerProps, info)}
                >
                    <Video
                        source={{ uri: info.item.path_in_s3 }}
                        isMuted={false}
                        resizeMode="contain"
                        useNativeControls
                        style={{ width: 300, height: 300 }}
                    />
                </Card>
            </React.Fragment>

        )



        const VideoFilter = () => {
            const filterVideoByTag = (checkBox, obj) => {
                this.setState(
                    produce(
                        draft => {
                            draft.filters[checkBox] = obj
                            if (!obj) {
                                draft.showVideos = draft.showVideos.filter(
                                    (value) => {
                                        return ((value.tag != checkBox) && (draft.filters[checkBox] == obj))
                                    }
                                )
                            }
                            else {
                                draft.showVideos = [
                                    ...this.props.videos.filter(
                                        (value) => {
                                            return (value.tag == checkBox)
                                        }
                                    ),
                                    ...draft.showVideos
                                ]
                                draft.showVideos.sort(
                                    (a, b) => b.timestamp - a.timestamp
                                )
                            }
                        }
                    )
                )
            }

            const groupDisplayValues = this.state.filters.location.map(index => {
                return this.props.locations[index.row]
            })

            const filterVideoByLocation = (obj = this.state.filters.location) => {
                // console.log(obj);
                this.setState(produce(draft => {
                    draft.filters.location = obj

                    const locations = obj.map(index => {
                        return this.props.locations[index.row]
                    })

                    draft.showVideos = this.props.videos.filter(
                        (value) => {
                            return locations.includes(value.location)
                        }
                    )
                }))
                filterVideoByTag('intruder', this.state.filters.intruder)
                filterVideoByTag('periodic', this.state.filters.periodic)
                filterVideoByTag('movement', this.state.filters.movement)
            }

            const changeDateRange = (fromDate, toDate) => {
                this.setState(produce(
                    draft => {
                        draft.filters.fromDate = fromDate
                        draft.filters.toDate = toDate
                        draft.showVideos = this.props.videos.filter(
                            value => {
                                let date = reverseConvertDate(value.metadata.timestamp)
                                let cond1 = true
                                if (fromDate != null)
                                    cond1 = (fromDate <= date)

                                let cond2 = true
                                if (toDate != null)
                                    cond2 = (date <= toDate)
                                console.log({"dates": {fromDate, toDate, date, str: value.metadata.timestamp},"cond1": cond1, "cond2": cond2});
                                return cond1 && cond2
                            }
                        )
                    }
                ))
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
                            onSelect={filterVideoByLocation}
                            value={groupDisplayValues.join(',')}
                            selectedIndex={this.state.filters.location}
                            multiSelect={true}
                        >
                            {
                                this.props.locations.map((key, index) => (<SelectItem title={key} />))
                            }
                        </Select>
                    </Layout>
                </React.Fragment>
            )

            return <React.Fragment>
                <Layout>
                    {/* <Input style={{ borderRadius: 0 }} placeholder='Search Videos...' /> */}
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
                            data={this.state.showVideos}
                            renderItem={renderVideo}
                        />

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
        // marginLeft: 10
    },
    filterLayout: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        alignContent: 'center'
    }
});

const mapStateToProps = (store, ownProps) => ({
    videos: store.Data.videos,
    locations: Array.from(new Set(Object.values(store.Data.locations))),
    loading: store.UI.Recordings.loading,
    message: store.UI.Recordings.message
})

const mapDispatchToProps = (dispatch) => {
    return {
        load: message => dispatch(getRecordings())
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(RecordingsTab);
