import React, { Component, ReactNode } from "react"
import { Text, View, FlatList } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Avatar } from 'react-native-elements'
import moment from 'moment'

class RecordingsTab extends Component {
    state = {
        videos: [
            {
                path_in_s3: "somepath",
                location: "Location 1",
                timestamp: moment.unix(1593568800).format("dddd, MMMM Do YYYY, hh:mm a")
            },
            {
                path_in_s3: "",
                location: "Location 2",
                timestamp: moment.unix(1593568800).format("dddd, MMMM Do YYYY, hh:mm a")
            },
            {
                path_in_s3: "",
                location: "Location 3",
                timestamp: moment.unix(1593568800).format("dddd, MMMM Do YYYY, hh:mm a")
            }
        ]
    }
    constructor(props: any) {
        super(props);
    }

    render() {
        var renderVideo = (obj:any) => {
            return <Card key={obj.index} image={require('../assets/intruder.jpg')}>
                <View style={{
                    flexDirection: "row",
                    padding: 10,
                    margin: 10
                }}>
                    <View style={{ paddingRight: 20 }}>
                        <Avatar
                            rounded
                            size="small"
                            source={require('../assets/thief.png')}
                        />
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{obj.item.location}</Text>
                        <Text>{obj.item.timestamp}</Text>
                    </View>
                </View>
            </Card>
        }

        var videos = [...this.state.videos]

        return (
            <SafeAreaView>
                <FlatList data={videos} renderItem={renderVideo}/>
            </SafeAreaView>
        );
    }
}

export default RecordingsTab;