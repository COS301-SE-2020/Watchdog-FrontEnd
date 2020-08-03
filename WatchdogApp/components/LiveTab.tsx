import React, { Component } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
class LiveTab extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <Text>This is the LIVE Page</Text>
            </SafeAreaView>
        );
    }
}

export default LiveTab;