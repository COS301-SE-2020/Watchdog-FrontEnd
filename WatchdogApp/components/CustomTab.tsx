import React, { Component } from "react";
import HeaderBar from "./HeaderBar"
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import SettingsTab from "./SettingsTab";
import { Layout } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";

interface TabProps {
    tabContent: any,
    title: string,
}

const Stack = createStackNavigator();

class CustomTab extends Component<TabProps> {
    constructor(props: any) {
        super(props)
    }

    render() {

        const tabContent = () => {
            const navigation = useNavigation()
            return <Layout style={{ flexGrow: 1, flex: 1 }}>
                <HeaderBar text={this.props.title} onPress={() => navigation.navigate('Settings')} />
                {this.props.tabContent}
            </Layout>
        }

        return (
            <Stack.Navigator>
                <Stack.Screen
                    name={this.props.title}
                    component={tabContent}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name='Settings' component={SettingsTab} options={{ headerShown: false }} />
            </Stack.Navigator>


        )
    }
}

export default CustomTab