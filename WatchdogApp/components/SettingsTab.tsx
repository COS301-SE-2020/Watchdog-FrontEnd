import React, { Component } from "react"
import { Text, View, SectionList } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider, Input, ListItem } from 'react-native-elements'
import HeaderBar from './HeaderBar'
import styles from '../styling'
import moment from 'moment'

//Dynamically create dummy data
const dummyData = Array.from({ length: 10 }, (_, index) => (
    {
        path_in_s3: "somepath",
        location: `Location ${index}`,
        timestamp: moment.unix(1593568800 + index * 24 * 60 * 60).format("dddd, MMMM Do YYYY, hh:mm a")
    }
))

class SettingsTab extends Component {
    state = {
        UserData: {
            preferences: {
                notifications: {
                    setting1: 'a',
                    setting2: 'b'
                },
                historical: {
                    setting3: 'c',
                    setting4: 'd'
                },
                security_level: {
                    setting5: 'e',
                    setting6: 'f'
                }
            }
        }
    }
    constructor(props: any) {
        super(props);
    }

    render() {

        let preferences: object[] = []

        let createArray = (title: string) => {
            let temp: string[] = []
            Object.keys(this.state.UserData.preferences[`${title}`]).forEach(
                (key) => temp.push({ setting: key, value: this.state.UserData.preferences[title][key] })
            )
            return temp
        }

        Object.keys(this.state.UserData.preferences).forEach(
            (key) => (
                preferences.push({
                    title: key,
                    data: createArray(key)
                })
            )
        )

        console.log(preferences);

        let componentRenderer = (obj: any) => (
            <View>
                {/* <Text>{obj.item.setting}</Text> */}
                {/* <Text>{obj.item.value}</Text> */}
                <ListItem
                    key={obj.index}
                    title={'Title'}
                    // leftIcon={{ name: item.icon }}
                    bottomDivider
                    chevron
                />
                <Input
                    placeholder={obj.item.setting}
                />
            </View>
        )

        return (
            <View>
                <HeaderBar text={'Settings'} />
                <SectionList
                    sections={preferences}
                    keyExtractor={(item, index) => item + index}
                    renderItem={componentRenderer}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={{ backgroundColor: 'white' }}>
                            <Divider style={{ backgroundColor: 'blue' }} />
                            <Text style={{ ...styles.Heading, color: 'black', margin: 20 }}>{title}</Text>
                            <Divider style={{ backgroundColor: 'blue' }} />
                        </View>
                    )}
                />
            </View>
        );
    }
}

export default SettingsTab;