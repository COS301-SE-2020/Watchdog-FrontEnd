import React, { Component } from 'react'
import { Layout, Button, Divider, Text, Select, SelectItem, Input, Icon } from '@ui-kitten/components'
import { TouchableWithoutFeedback } from 'react-native';
import  { Auth } from 'aws-amplify'
import {  Alert } from "react-native"
import Spinner from 'react-native-loading-spinner-overlay'

interface propsPasswordSettingsScreen{

}
interface statePasswordSettingsScreen{
    old_password : string
    secureTextEntryPaswword : boolean
    new_password : string
    confirm_password : string
    loading : boolean

    
}
const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'/>
  )
class PasswordSettingsScreen extends Component<propsPasswordSettingsScreen, statePasswordSettingsScreen> {
    constructor(props: any){
        super(props)

        this.state={
            old_password : '',
           secureTextEntryPaswword : true ,
           new_password: '',
           confirm_password : '',
           loading : false
        }
        this.changeSecureEntryPassword = this.changeSecureEntryPassword.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
    }
    changeSecureEntryPassword(){
        this.setState({secureTextEntryPaswword : !this.state.secureTextEntryPaswword})
    }

    async updatePassword(){
        if(this.state.old_password===""){
            Alert.alert(
                "Error",
                "Please enter your old password",
                [
                  
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
            
            return
          }
    
          if(this.state.new_password===""){
            Alert.alert(
                "Error",
                "Please enter your new password",
                [
                  
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
            
            return
          }
    
          if(this.state.confirm_password===""){
            Alert.alert(
                "Error",
                "Please confirm your new password",
                [
                  
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
            return
          }
    
          if(this.state.confirm_password !== this.state.new_password){
            Alert.alert(
                "Error",
                "Passwords dont match",
                [
                  
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
            return
          }
    
          if(!this.state.new_password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
            Alert.alert(
                "Error",
                "Invalid Password. Password must be 8 characters long, contain: an uppercase character, a number and a special character",
                [
                    
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
                );
            
            return
          }

          this.setState({loading:true})
    
          try {
            let currentUser = await Auth.currentAuthenticatedUser();
            await Auth.changePassword(
              currentUser,
              this.state.old_password,
              this.state.new_password
            ).then(
              ()=>{
                Alert.alert(
                    "Success",
                    "Password changed",
                    [
                        
                        { text: "OK", onPress: () => this.setState({old_password : "",
                                                                    new_password : "",
                                                                    confirm_password : "",
                                                                    loading : false}) }
                    ],
                    { cancelable: false }
                    );
                
    
                
               
              }
              
            );
      
            
          } catch (error) {
            //Alert.error(error)
            Alert.alert(
                "Error",
                "Incorrect current password",
                [
                    
                    { text: "OK", onPress: () => this.setState({ old_password : '',
                                                                    secureTextEntryPaswword : true ,
                                                                    new_password: '',
                                                                    confirm_password : '',
                                                                loading: false}) }
                ],
                { cancelable: false }
                );
            console.log(error)
           
              
          }


        

    }
    render() {
        const renderIcon = (props) => (
            <TouchableWithoutFeedback onPress={this.changeSecureEntryPassword}>
              <Icon {...props} name={this.state.secureTextEntryPaswword ? 'eye-off' : 'eye'}/>
            </TouchableWithoutFeedback>
          )
        return (
            <Layout style={{flex:1, padding: 10}}>
                <Spinner
                visible={this.state.loading}
                textContent={''}
                
                />
                <Input
                    value={this.state.old_password}
                    label= {()=><Text style={{textAlign : 'auto', paddingBottom: 5}} category='h6'>Current Password</Text>}
                    placeholder='Current Password'
                    caption='Enter your current password'
                    accessoryRight={renderIcon}
                    captionIcon={AlertIcon}
                    secureTextEntry={this.state.secureTextEntryPaswword}
                    onChangeText={nextValue => this.setState({old_password : nextValue})}
                />
                 <Divider style={{margin: 10, backgroundColor: 'transparent'}}/>

                 <Input
                    value={this.state.new_password}
                    label= {()=><Text style={{textAlign : 'auto', paddingBottom: 5}} category='h6'>New Password</Text>}
                    placeholder='New Password'
                    caption='Password should contain 8 characters. Contain a number, capital letter and a special character'
                    accessoryRight={renderIcon}
                    captionIcon={AlertIcon}
                    secureTextEntry={this.state.secureTextEntryPaswword}
                    onChangeText={nextValue => this.setState({new_password : nextValue})}
                />
                <Divider style={{margin: 10, backgroundColor: 'transparent'}}/>

                <Input
                value={this.state.confirm_password}
                
                label= {()=><Text style={{textAlign : 'auto', paddingBottom: 5}} category='h6'>Confirm New Password</Text>}
                placeholder='Confirm New Password'
                caption='Retype your new password'
                accessoryRight={renderIcon}
                captionIcon={AlertIcon}
                secureTextEntry={this.state.secureTextEntryPaswword}
                onChangeText={nextValue => this.setState({confirm_password : nextValue})}
                />
                <Divider style={{margin: 10, backgroundColor: 'transparent'}}/>
                <Button  appearance='outline' status='success' onPress={this.updatePassword}>Update Password</Button>
                


            </Layout>
        )
    }
}

export default PasswordSettingsScreen