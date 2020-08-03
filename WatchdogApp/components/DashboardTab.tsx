import React, { Component } from "react"
import { Text } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
class DashboardTab extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <Text>This is the DASHBOARD Page</Text>
            </SafeAreaView>
        );
    }
}

export default DashboardTab;