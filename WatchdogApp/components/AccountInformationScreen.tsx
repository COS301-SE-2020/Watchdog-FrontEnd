import React, { Component } from 'react'
import { Layout, Divider, Menu, MenuItem, Select, SelectItem, Input } from '@ui-kitten/components'
import {  ScrollView, Image } from 'react-native'
import  { Auth } from 'aws-amplify'

interface propsAccountInformationScreen{

}

interface statesAccountInformationScreen{
    user_info : any
    
}
class AccountInformationScreen extends Component<propsAccountInformationScreen, statesAccountInformationScreen> {
    constructor(props : any){
        super(props)
        this.state ={
            user_info : {}
        }
        

    }
    async componentDidMount(){
        let {attributes} = await Auth.currentAuthenticatedUser()
        this.setState({user_info: attributes})
        console.log(attributes)

    }
    render() {
        let name = this.state.user_info.name || ''
        return (
            
            <Layout style={{flex:1, padding: 10}}>
                <ScrollView>
                    <Input
                    label="Full Name"
                    disabled={true}
                    value={this.state.user_info.name || ''}
                    />
                    <Divider style={{margin: 10, backgroundColor: 'transparent'}}/>

                    <Input
                    label="Email"
                    disabled={true}
                    value={this.state.user_info.email || ''}
                    />
                    <Divider style={{margin: 10, backgroundColor: 'transparent'}}/>

                    <Input
                    label="Phone Number"
                    disabled={true}
                    value={this.state.user_info.phone_number || ''}
                    />
                    <Divider style={{margin: 10, backgroundColor: 'transparent'}}/>

                </ScrollView>
            </Layout>
        );
    }
}

export default AccountInformationScreen;