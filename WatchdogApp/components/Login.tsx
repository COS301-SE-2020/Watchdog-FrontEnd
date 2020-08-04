import React, { Component } from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import { SignIn , Authenticator, SignUp, ConfirmSignIn } from 'aws-amplify-react-native'
import LoginScreen from './loginScreen/LoginScreen.js'
import { MaterialIcons, Ionicons, MaterialCommunityIcons, Feather, FontAwesome  } from '@expo/vector-icons'
import  { Auth } from 'aws-amplify'

const signUpConfig = {
    header: 'Sign Up',
    hideAllDefaults: true,
    defaultCountryCode: '27',
    signUpFields: [
      {
        label: 'Create a username',
        key: 'username',
        required: true,
        displayOrder: 1,
        type: 'string'
        
     },
     {
        label: 'Fullname',
        key: 'name',
        required: true,
        displayOrder: 2,
        type: 'string'
        
     },
     {
        label: 'Email',
        key: 'email',
        required: true,
        displayOrder: 3,
        type: 'string'
        
     },
     {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 6,
        type: 'password'
        
     },
     {
        label: 'Phone Number',
        key: 'phone_number',
        required: true,
        displayOrder: 4,
        type: 'number'
        
     },
     {
        label: 'Address',
        key: 'adress',
        required: true,
        displayOrder: 5,
        type: 'number'
        
     },
    ]
  };

interface loginProps{

}

interface loginState{
    username : string,
    password : string
}
class Login extends Component<loginProps, loginState> {

    constructor(props: loginProps){
        super(props)

        this.state ={
            username : "",
            password : ""
        }

        this.handleSignIn = this.handleSignIn.bind(this)
    }

    handleSignIn(){
        Auth.signIn(this.state.username, this.state.password)
    }

    render() {
        return (
            <LoginScreen 
            // logoComponent  ={<Text style={{fontSize: 27,
            //     color: "#fdfdfd",
            //     }}>Watchdog</Text>}
            logoText = "Watchdog" 
            disableSettings ={true}
            //source  = {{ uri: "https://reactjs.org/logo-og.png" }}
            source  = {require("../assets/background.jpg")}
            onPressLogin ={()=>{Auth.signIn(this.state.username, this.state.password)}}
            usernameOnChangeText ={(val)=>{this.setState({username : val})}}
            passwordOnChangeText ={(val)=>{this.setState({password : val})}}
            emailOnChangeText ={(val)=>{console.log(val)}}
            signupUsernameOnChangeText ={(val)=>{console.log(val)}}
            
            repasswordOnChangeText={(val)=>{console.log(val)}}
            />
            // <Authenticator
            //     // hideDefault={true}
            //     signUpConfig={ signUpConfig }
            //     >
            //         {/* <SignIn />

            //         <SignUp signUpConfig={ signUpConfig }/>
            //         <ConfirmSignIn /> */}
                
            // </Authenticator>
        )
    }
}

export default Login