import React, { Component } from 'react'
import { Header } from 'react-native-elements'
import stylesheet from '../styling'
import { useTheme } from "react-native-themed-styles"
import { Button, Icon, Layout, Text } from '@ui-kitten/components'

interface HeaderBarProps {
    text: string,
    onPress: Function
}

const SettingsIcon = (props) => (
    <Icon {...props} name='settings-2'/>
);

class HeaderBar extends Component<HeaderBarProps> {
    constructor(props: HeaderBarProps) {
        super(props)
    }

    render() {
        return (
            <Layout>
                <Header
                    placement="center"
                    rightComponent={<Button style={styles.button} appearance='ghost' status='danger' accessoryLeft={SettingsIcon} onPress={
                        () => {
                            console.log('Header Pressed!')
                            this.props.onPress()
                        }
                    } />}
                    centerComponent={{ text: this.props.text, style: stylesheet.Heading }}

                />
            </Layout>
        )
    }
}

const styles = {
    button: {}
}

export default HeaderBar