import React, {Component} from 'react';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react';


class Login extends Component {
    constructor(){
        super()
    }

    render (){
        return(
            <AmplifyAuthenticator usernameAlias="email" >
                <AmplifySignUp
                    
                    slot="sign-up"
                    usernameAlias="email"
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
                <AmplifySignIn slot="sign-in" usernameAlias="email" />
            </AmplifyAuthenticator>
        )

    }
}

export default Login