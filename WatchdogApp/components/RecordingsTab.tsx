import React, { Component, ReactNode } from "react"
import { Text, View, FlatList } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Avatar } from 'react-native-elements'
import moment from 'moment'

const dummyData = Array.from({ length: 10 }, (_, index) => (
    {
        path_in_s3: "somepath",
        location: `Location ${index}`,
        timestamp: moment.unix(1593568800+index*24*60*60).format("dddd, MMMM Do YYYY, hh:mm a")
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
        var renderVideo = (obj: any) => {
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
                <FlatList data={videos} renderItem={renderVideo} />
            </SafeAreaView>
        );
    }
}

export default RecordingsTab;