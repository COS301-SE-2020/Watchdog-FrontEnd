import React, { Component } from 'react'
import { Layout, Button, Menu, MenuItem, Select, SelectItem, Input, IndexPath } from '@ui-kitten/components'

const data = [
    'SMS',
    'Email',
    'Push Notifications',
  ]


interface propsNotificationSettingsScreen{

}

interface stateNotificationSettingsScreen{
    security_company: string
    type: IndexPath
    value: string
}

class NotificationSettingsScreen extends Component<propsNotificationSettingsScreen, stateNotificationSettingsScreen> {
    constructor(props: propsNotificationSettingsScreen){
        super(props)

        this.state = {
            security_company : '0114330033',
            type : new IndexPath(0),
            value : '0124569632'
        }
    }
    render() {
        return (
            <Layout style={{flex:1, padding: 10}}>
                <Select 
                placeholder='Select your notification type.'
                selectedIndex = {this.state.type}
                onSelect ={(index: any)=>{this.setState({type : index})}}
                value ={data[this.state.type.row]}
                >
                    <SelectItem title='SMS' />
                    <SelectItem title='Email' />
                    <SelectItem title='Push Notifications' />
                </Select>


                <Input
                    keyboardType = 'phone-pad'
                    maxLength={10}
                    value={this.state.security_company}
                    onChange={(val: any)=>this.setState({security_company: val})}
                    style={{ marginVertical: 10 }}
                    label='Security Company Contact Details'
                    caption="Enter your security company's phone number."
                />

                <Button  appearance='outline' status='info'>
                    Update
                </Button>

            </Layout>
        )
    }
}

export default NotificationSettingsScreen