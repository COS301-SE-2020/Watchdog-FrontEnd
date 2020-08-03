import React, { Component } from "react"
import { Text, Image, View } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Button, Icon, Avatar } from 'react-native-elements'

class RecordingsTab extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <Card image={require('./intruder.jpg')}>
                    <View style={{
                        flexDirection: "row",
                        padding: 10
                    }}>
                        <View style={{paddingRight: 20}}>
                            <Avatar
                                rounded
                                size="small"
                                source={require('../assets/thief.png')}
                            />
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Room</Text>
                            <Text>Time</Text>
                        </View>
                    </View>
                </Card>

            </SafeAreaView>
        );
    }
}

export default RecordingsTab;