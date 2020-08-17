import React, { Component } from 'react'
import { Layout, Button, Menu, MenuItem, Select, SelectItem, Input, IndexPath } from '@ui-kitten/components'
import { connect } from 'react-redux'

import { getPreferences, updateNotificationPreferences } from '../app-redux/actions'

const data = [
    'SMS',
    'Email'.toUpperCase(),
    'Push'.toUpperCase,
]

const index = [
    new IndexPath(0), new IndexPath(1), new IndexPath(2)
]

interface PreferencesObject {
    email: string,
    phone: string,
    security_company: string,
    type: string
}

interface propsNotificationSettingsScreen {
    loading: boolean,
    updating: boolean,
    load: Function,
    edit: Function,
    update: Function,
    preferences: PreferencesObject

}

interface stateNotificationSettingsScreen {
    security_company: string
    type: IndexPath
    value: string
}

class NotificationSettingsScreen extends Component<propsNotificationSettingsScreen, stateNotificationSettingsScreen> {
    constructor(props: propsNotificationSettingsScreen) {
        super(props)

        this.state = {
            security_company: '0114330033',
            type: new IndexPath(0),
            value: '0124569632'
        }
    }

    componentDidMount = () => {
        this.props.load()
    }

    render() {
        const editType = (index) => {
            this.props.edit(this.props.preferences.security_company, data[index.row].toLowerCase())
        }

        const editSecurityCompany = (value) => {
            this.props.edit(value, this.props.preferences.type.toLowerCase())
        }

        return (
            <Layout style={{ flex: 1, padding: 10 }}>
                <Select
                    placeholder='Select your notification type.'
                    selectedIndex={index[data.indexOf(this.props.preferences.type.toUpperCase())]}
                    onSelect={editType}
                    value={this.props.preferences.type.toUpperCase()}
                    disabled={this.props.updating || this.props.loading}
                >
                    <SelectItem title='SMS' />
                    <SelectItem title='Email' />
                    <SelectItem title='Push Notifications' />
                </Select>


                <Input
                    keyboardType='phone-pad'
                    maxLength={10}
                    value={this.props.preferences.security_company}
                    onChange={editSecurityCompany}
                    style={{ marginVertical: 10 }}
                    label='Security Company Contact Details'
                    caption="Enter your security company's phone number."
                    disabled={this.props.updating || this.props.loading}
                />

                <Button 
                    appearance='outline' status='info'
                    disabled={this.props.updating || this.props.loading}
                    onPress={() => this.props.update(this.props.preferences.security_company, this.props.preferences.type)}
                >
                    Update
                </Button>

            </Layout>
        )
    }
}

const mapStoreToProps = (store) => ({
    preferences: store.Data.preferences.notifications,
    loading: store.UI.Preferences.loading,
    updating: store.UI.Notifications.updating
})

const mapDispatchToProps = (dispatch) => ({
    load: () => dispatch(getPreferences()),
    update: (security_company, type) => dispatch(updateNotificationPreferences(security_company, type)),
    edit: (security_company, type) => dispatch({
        type: 'EDIT_NOTIFICATIONS',
        data: {
            security_company,
            type
        }
    })
})

export default connect(mapStoreToProps, mapDispatchToProps)(NotificationSettingsScreen)