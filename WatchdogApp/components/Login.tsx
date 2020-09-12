import React, { Component } from 'react'
import { Alert, View, Image } from 'react-native'
import { SignIn, Authenticator, SignUp, ConfirmSignIn } from 'aws-amplify-react-native'
import LoginScreen from './loginScreen/LoginScreen.js'
import { MaterialIcons, Ionicons, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons'
import { Auth } from 'aws-amplify'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'

import { getUserData, getRecordings } from '../app-redux/actions'

interface loginProps {
    load: Function
}

interface loginState {
    username: string,
    password: string,
    loading: boolean
}
class Login extends Component<loginProps, loginState> {

    constructor(props: loginProps) {
        super(props)

        this.state = {
            username: "",
            password: "",
            loading: false
        }

        this.handleSignIn = this.handleSignIn.bind(this)
    }

    handleSignIn() {
        if (this.state.username === '') {
            Alert.alert(
                "Login Fail",
                "Please enter your username",
                [

                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            )
            return
        }

        if (this.state.password === '') {
            Alert.alert(
                "Login Fail",
                "Please enter your password",
                [

                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            )
            return
        }
        this.setState({ loading: true })
        Auth.signIn(this.state.username, this.state.password).then(() => {
            this.props.load()
            this.setState({ loading: false })
        }).catch(() => {
            Alert.alert(
                "Login Fail",
                "Invalid username and/or password",
                [

                    { text: "OK", onPress: () => this.setState({ loading: false }) }
                ],
                { cancelable: false }
            )

        })
    }

    render() {
        return (
            <View>
                <Spinner
                    visible={this.state.loading}
                    textContent={''}
                //textStyle={styles.spinnerTextStyle}
                />

                <LoginScreen
                    // logoComponent  ={<Text style={{fontSize: 27,
                    //     color: "#fdfdfd",
                    //     }}>Watchdog</Text>}

                    logoText="Watchdog"
                    disableSettings={true}
                    //source  = {{ uri: "https://reactjs.org/logo-og.png" }}
                    
                    disableSignupButton= {true}
                
                    source={require("../assets/background.jpg")}
                    onPressLogin={this.handleSignIn}
                    usernameOnChangeText={(val) => { this.setState({ username: val }) }}
                    passwordOnChangeText={(val) => { this.setState({ password: val }) }}
                    emailOnChangeText={(val) => { console.log(val) }}
                    signupUsernameOnChangeText={(val) => { }}

                    repasswordOnChangeText={(val) => { console.log(val) }}
                >

                </LoginScreen>
            </View>
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

const mapDispatchToProps = (dispatch) => ({
    load: () => Promise.all[dispatch(getUserData()), dispatch(getRecordings())]
})

export default connect(null, mapDispatchToProps)(Login)