import React, { Component } from "react"
import { Text, Button } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import  { Auth } from 'aws-amplify'
class DashboardTab extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <Text>This is the DASHBOARD Page</Text>
                <Button
                title="Logout"
                
                onPress={() => Auth.signOut()}
                 />
            </SafeAreaView>
        );
    }
}

export default DashboardTab;