import React, { Component } from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'

class RecordingsTab extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <Text>This is the RECORDINGS Page</Text>
            </SafeAreaView>
        );
    }
}

export default RecordingsTab;