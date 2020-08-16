import React, { Component } from 'react'
import * as Permissions from 'expo-permissions'
import { Layout, Button, Divider, Text, Select, SelectItem, Input, IndexPath } from '@ui-kitten/components'
import { ScrollView, Image } from 'react-native'
import { connect } from "react-redux";
import * as ImagePicker from 'expo-image-picker'
import { produce } from 'immer'

import CancelNewIdentityButton from "./CancelNewIdentityButton";
import { uploadIdentity } from '../app-redux/actions'


interface propsAddIdentityScreen {
  upload: Function,
  uploading: boolean
}

interface stateAddIdentityScreen {
  image: any,
  name: string
}

class AddIdentityScreen extends Component<propsAddIdentityScreen, stateAddIdentityScreen> {
  constructor(props: any) {
    super(props)
    this.state = {
      image: null,
      name: ''
    }
  }

  async componentDidMount() {
    let { status, expires, permissions } = await Permissions.getAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    )
    if (status !== 'granted') {
      let { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
      );
    }

  }
  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState(produce(draft => {
          draft.image = 'data:image/jpeg;base64,' + result.base64
        }));
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  _pickImageCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState(produce(draft => {
          draft.image = 'data:image/jpeg;base64,' + result.base64
        }));
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  render() {
    let { image } = this.state
    const changeText = (text) => {
      this.setState(produce(draft => {
        draft.name = text
      }))
    }

    const upload = () => {
      // console.log(this.state.image);

      this.props.upload(this.state.name, this.state.name + ".jpg", this.state.image)
      this.setState(produce(draft => {
        draft.image = null,
        draft.name = ''
      }))
    }

    return (
      <Layout style={{ flex: 1, padding: 10 }}>
        <ScrollView style={{ maxHeight: "90%" }}>
          <Input
            label={() => <Text style={{ textAlign: 'auto', paddingBottom: 5 }} category='h6'>Full name</Text>}
            caption="Enter the new identities name."
            value={this.state.name}
            onChangeText={(text) => changeText(text)}
          />
          <Divider style={{ margin: 5, backgroundColor: 'transparent' }} />

          <Button disabled={this.props.uploading} onPress={this._pickImage} >Pick Image from library</Button>
          <Divider style={{ margin: 5, backgroundColor: 'transparent' }} />
          <Text style={{ textAlign: 'center' }} category='h6'>Or</Text>
          <Divider style={{ margin: 5, backgroundColor: 'transparent' }} />
          <Button disabled={this.props.uploading} onPress={this._pickImageCamera} >Take a photo</Button>
          <Divider style={{ margin: 10, backgroundColor: 'transparent' }} />
          <Layout style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {image && <Image source={{ uri: this.state.image }} style={{ width: 250, height: 250 }} />}
          </Layout>
          <Divider style={{ margin: 5, backgroundColor: 'transparent' }} />

        </ScrollView>
        <Layout style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 10,


        }}>
          <Layout style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <CancelNewIdentityButton />
            <Button disabled={this.props.uploading} style={{ margin: 2, height: 30, width: "50%" }} appearance='outline' status='success' onPress={upload}>
              Ok
                    </Button>
          </Layout>
        </Layout>

      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  upload: (name, filename, file) => dispatch(uploadIdentity(name, filename, file))
})
const mapStoreToProps = (store) => ({
  uploading: store.UI.Identities.uploading
})

export default connect(mapStoreToProps, mapDispatchToProps)(AddIdentityScreen)