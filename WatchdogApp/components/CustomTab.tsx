import React, { Component } from "react";
import HeaderBar from "./HeaderBar"
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
            return <Layout>
                <HeaderBar text={this.props.title} onPress={() => navigation.navigate('Settings')}/>
                {this.props.tabContent}
            </Layout>
        }

        return (
            
            <NavigationContainer independent={true}>
                <Stack.Navigator>
                    <Stack.Screen
                        name={this.props.title}
                        component={tabContent}
                        options={{
                            headerShown: false
                        }}
                    // options={{ headerTitle: props => <HeaderBar text={this.props.title} /> }}
                    />
                    <Stack.Screen name='Settings' component={SettingsTab} />
                </Stack.Navigator>
            </NavigationContainer>

        )
    }
}

export default CustomTab