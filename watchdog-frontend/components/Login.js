import React, {Component} from 'react';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react';


class Login extends Component {
    constructor(){
        super()
    }

    render (){
        const styling  = {"display":"flex",
        "justifyContent":"center",
        "alignItems":"center",
        "verticalAlign":"middle",
        "height" : "90vh",
        "overflow": "hidden"}
        return(
            <div style={styling}>  
                <AmplifyAuthenticator usernameAlias="email" >
                    <AmplifySignUp
                        
                        slot="sign-up"
                        usernameAlias="email"
                        headerText="Create your Watchdog Account"
                        formFields={[
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
                        ]} 
                    />
                    <AmplifySignIn 
                    slot="sign-in" 
                    usernameAlias="email"
                    headerText="Sign into your Watchdog Account"
                    />
                </AmplifyAuthenticator>
            </div>
        )

    }
}

export default Login