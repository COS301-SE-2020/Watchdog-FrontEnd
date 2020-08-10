import React, { Component } from 'react';
import { Layout, Button, Card, Divider, Text } from '@ui-kitten/components'
import {  ScrollView, Image } from 'react-native'
import AddNewIdentityButton from './AddNewIdentityButton'
const test_users = [
    {
        id : 1,
        name : "Luqmaan Badat",
        img : "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    },
    {
        id : 2,
        name : "Some Name 2",
        img : "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    }
]
interface user{ 
    id : number, 
    name : string,
    img : string
}
interface propsIdentitySettingsScreen{

}

interface stateIdentitySettingsScreen{
    users : user []

}
class IdentitySettingsScreen extends Component<propsIdentitySettingsScreen, stateIdentitySettingsScreen> {
    constructor(props : propsIdentitySettingsScreen){
        super(props)
        this.state = {
            users : test_users
        }
    }
    render() {
        let identities = this.state.users.map((item, index)=>{
            return(
                <Layout key={index} >
                    <Card status='basic' >
                        <Text  category='h5'>{item.name}</Text>
                        <Divider style={{margin: 5, backgroundColor: 'transparent'}}/>
                        <Layout style={{ justifyContent: 'center',
                                         alignItems: 'center',}}>
                            <Image
                            // style={styles.tinyLogo}
                            style ={{
                                width: 300,
                                height: 300,
                                resizeMode : 'stretch'

                                
                              }}
                            source={{
                                uri: item.img,
                              }}
                        />
                        </Layout>
                        
                        <Divider style={{margin: 5, backgroundColor: 'transparent'}}/>
                        <Button  appearance='outline' status='danger'>
                            Remove
                        </Button>
                    </Card>


                <Divider style={{margin: 5, backgroundColor: 'transparent'}}/>

                </Layout>
            )
        })
        return (
            <Layout style={{flex:1, padding: 10}}>
                <AddNewIdentityButton />
                <Divider style={{margin: 5, backgroundColor: 'transparent'}}/>
                <ScrollView>
                    {identities}
                </ScrollView>
                
            </Layout>
        );
    }
}

export default IdentitySettingsScreen;