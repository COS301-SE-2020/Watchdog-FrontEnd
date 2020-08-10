import React, { Component } from 'react'
import * as Permissions from 'expo-permissions'
import { Layout, Button, Divider, Text, Select, SelectItem, Input, IndexPath } from '@ui-kitten/components'
import {  ScrollView, Image } from 'react-native'
import PhotoUpload from 'react-native-photo-upload'
import * as ImagePicker from 'expo-image-picker'
import  CancelNewIdentityButton  from "./CancelNewIdentityButton";
interface propsAddIdentityScreen{

}

interface stateAddIdentityScreen{
    image: any
}

class AddIdentityScreen extends Component {
    constructor(props: any){
        super(props)
        this.state = {
            image: null
        }
    }

    async componentDidMount(){
        let { status, expires, permissions } = await Permissions.getAsync(
            Permissions.CAMERA,
            Permissions.CAMERA_ROLL
          )
          if (status !== 'granted') {
            let  { status } = await Permissions.askAsync(
                Permissions.CAMERA,
                Permissions.CAMERA_ROLL
              );
          }

    }
    _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ image: result.uri });
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };
    
    _pickImageCamera = async () => {
        try {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ image: result.uri });
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };
    render() {
        let { image } = this.state
        return (
           <Layout style={{flex:1, padding: 10}}>
               <ScrollView style={{maxHeight:"90%"}}>
               <Input 
                label= {()=><Text style={{textAlign : 'auto', paddingBottom: 5}} category='h6'>Full name</Text>}
                caption="Enter the new identities name."
               />
                <Divider style={{margin: 5, backgroundColor: 'transparent'}}/>
               
                <Button onPress={this._pickImage} >Pick Image from library</Button>
                <Divider style={{margin: 5, backgroundColor: 'transparent'}}/>
                <Text style={{textAlign : 'center'}} category='h6'>Or</Text>
                <Divider style={{margin: 5, backgroundColor: 'transparent'}}/>
                <Button onPress={this._pickImageCamera} >Take a photo</Button>
                <Divider style={{margin: 10, backgroundColor: 'transparent'}}/>
                <Layout style={{ justifyContent: 'center',
                                         alignItems: 'center',}}>
                {image && <Image source={{ uri: this.state.image }} style={{ width: 250, height: 250 }} />}
                </Layout>
                <Divider style={{margin: 5, backgroundColor: 'transparent'}}/>
                
                </ScrollView>
                <Layout style={{flex: 1,
                                justifyContent: 'flex-end',
                                marginBottom: 10,
                                
                                
                               }}>
                     <Layout style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'}}>
                    <CancelNewIdentityButton />
                    <Button style={{margin: 2, height: 30,width:"50%"}} appearance='outline' status='success'>
                    Ok
                    </Button>
                    </Layout>
                </Layout>
               
           </Layout>
        )
    }
}

export default AddIdentityScreen