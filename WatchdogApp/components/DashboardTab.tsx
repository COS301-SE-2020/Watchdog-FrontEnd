import React, { Component } from "react"
import { Text, Button } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Auth } from 'aws-amplify'
import CustomTab from "./CustomTab";
import { Layout } from "@ui-kitten/components";
class DashboardTab extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <CustomTab
                title="Dashboard"
                tabContent={
                    <Layout>

                        <Text>This is the DASHBOARD Page</Text>
                        <Button
                            title="Logout"

                            onPress={() => Auth.signOut()}
                        />
                    </Layout>
                }
            />

        );
    }
}

export default DashboardTab;