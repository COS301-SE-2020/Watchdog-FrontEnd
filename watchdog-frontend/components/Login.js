import React, {Component, useEffect} from 'react';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, withAuthenticator, AmplifySignOut, AmplifyConfirmSignIn } from '@aws-amplify/ui-react'
import Amplify, { Auth  } from 'aws-amplify'



const styling  = {"display":"flex",
        "justifyContent":"center",
        "alignItems":"center",
        "verticalAlign":"middle",
        "height" : "90vh",
}
        

// You can get the current config object
const currentConfig = Auth.configure();


class Login extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div style={styling}>  
                <AmplifyAuthenticator  >
                    <AmplifySignUp
                        slot="sign-up"
                        headerText="Create your Watchdog Account"
                        formFields={[
                        {
                            type: "username",
                            label: "Username",
                            placeholder: "Create a username",
                            required: false,
                        },
                        {
                            type: "name",
                            label: "Full Name",
                            placeholder: "Enter your full name",
                            required: false,
                        },
                        {
                            type: "email",
                            label: "Email Address",
                            placeholder: "Enter your email address",
                            required: true,
                        },
                        {
                            type: "password",
                            label: "Password",
                            placeholder: "Enter your password",
                            required: true,
                        },
                        {
                            type: "phone_number",
                            label: "Phone Number",
                            placeholder: "Phone Number",
                            required: false,
                        },
                        {
                            type: "address",
                            label: "Address",
                            placeholder: "Enter your address",
                            required: false,
                        },
                        ]} 
                    />
                    <AmplifySignIn 
                    slot="sign-in" 
                    headerText="Sign into your Watchdog Account"
                    
                    />
                    <AmplifyConfirmSignIn 
                        headerText="Please verify email" 
                        slot="confirm-sign-up"
                        formFields={[
                            
                        ]}
                        submitButtonText = "Okay"
                        handleSubmit ={event => this.signIn(event)}
                        />
                    
                </AmplifyAuthenticator>
                
            </div>
            
        )
    }
}

    

export default Login