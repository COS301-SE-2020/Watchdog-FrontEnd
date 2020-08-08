import React, { Component } from "react"
import { StyleSheet } from "react-native"
import { Video } from 'expo-av'
import moment from 'moment'
import CustomTab from "./CustomTab"
import { Card, List, Layout, Avatar, Text } from "@ui-kitten/components"

//Dynamically create dummy data
const dummyData = Array.from({ length: 1 }, (_, index) => (
    {
        key: index,
        path_in_s3: "somepath",
        location: `Location ${index}`,
        timestamp: moment.unix(1593568800 + index * 24 * 60 * 60).format("ddd, MM/DD/YY, hh:mm a")
    }
))

class RecordingsTab extends Component {
    state = {
        videos: [
            ...dummyData
        ]
    }
    constructor(props: any) {
        super(props);
    }

    render() {
        const videos = [...this.state.videos]

        const renderVideoHeader = (headerProps, info) => (
            <Layout style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
                <Layout>
                    <Avatar source={require('../assets/thief.png')} style={{ marginRight: 20 }} />
                </Layout>
                <Layout>
                    <Text category='h6'>{info.item.timestamp}</Text>
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
                    status='basic'
                    header={headerProps => renderVideoHeader(headerProps, info)}
                    footer={footerProps => renderVideoFooter(footerProps, info)}>

                    <Video
                        source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                        isMuted={false}
                        resizeMode="contain"
                        useNativeControls
                        style={{ width: 300, height: 300 }}
                    />

                </Card>
            </React.Fragment>

        )

        return (
            <CustomTab
                title="Recordings"
                tabContent={
                    <List style={styles.container} contentContainerStyle={styles.contentContainer} data={videos} renderItem={renderVideo} />
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
});

export default RecordingsTab;