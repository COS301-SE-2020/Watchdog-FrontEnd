import React, { Component, Dispatch } from "react"
import { StyleSheet } from "react-native"
import { Video } from 'expo-av'
import moment from 'moment'
import { Card, List, Layout, Avatar, Text, Drawer, DrawerGroup, Input, Datepicker, CheckBox, Select, SelectItem } from "@ui-kitten/components"
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

class RecordingsTab extends Component {
    state = {
        videos: [
            ...dummyData
        ]
    }
    constructor(props: any) {
        super(props);
    }

    componentDidMount = () => {
        this.props.load("hello")
        console.log("MOUNTED......................");
        console.log(this.props.videos)
        console.log("MOUNTED......................");
        
    }

    render() {
        const videos = [...this.props.videos]
        // const videos = []

        const renderVideoHeader = (headerProps, info) => (
            <Layout style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
                <Layout>
                    <Avatar source={require('../assets/thief.png')} style={{ marginRight: 20 }} />
                </Layout>
                <Layout>
                    <Text category='h6'>{convertTime(info.item.metadata.timestamp)}</Text>
                </Layout>
            </Layout>
        )
        const renderVideoFooter = (footerProps, info) => (
            // <Text category="label" style={{ padding: 20 }}>{info.item.location.toUpperCase()}</Text>
            <Text category="label" style={{ padding: 20 }}>{"Unknown"}</Text>
        )
        const renderVideo = (info) => (
            <React.Fragment>
                <Card
                    style={styles.item}
                    status='basic'
                    header={headerProps => renderVideoHeader(headerProps, info)}
                    footer={footerProps => renderVideoFooter(footerProps, info)}
                    onPress={() => console.log({ "state": this.state, "props": this.props })}
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
            const SelectRange = () => (
                <React.Fragment>
                    <Layout style={styles.filterLayout}>
                        <Datepicker style={styles.input} label="From:" date={new Date()} />
                        <Datepicker style={styles.input} label="To:" date={new Date()} />
                    </Layout>
                    <Layout style={styles.filterLayout}>
                        <CheckBox checked={true}>
                            Intruder Videos
                        </CheckBox>
                        <CheckBox checked={true}>
                            Periodic Videos
                        </CheckBox>
                    </Layout>
                    <Layout style={{ margin: 20 }}>
                        <Select style={styles.input} label='Select Room to Filter'>
                            <SelectItem title='Option 1' />
                            <SelectItem title='Option 2' />
                            <SelectItem title='Option 3' />
                        </Select>
                    </Layout>
                </React.Fragment>
            )
            return <React.Fragment>
                <Layout>
                    <Input style={{ borderRadius: 0 }} placeholder='Search Videos...' />
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
                            refreshing={false}
                            onRefresh={() => console.log('refresh')}
                            style={styles.container}
                            contentContainerStyle={styles.contentContainer}
                            data={videos}
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
        margin: 20,
        alignContent: 'center'
    }
});

const mapStateToProps = (store, ownProps) => ({
    videos: store.Data.videos
})

const mapDispatchToProps = (dispatch) => {
    return {
       load: message => dispatch(getRecordings())
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(RecordingsTab);
