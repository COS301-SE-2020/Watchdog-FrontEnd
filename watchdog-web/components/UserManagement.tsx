import React, { Component } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { stateNotificationModal, Login } from '../interfaces'
import { InputMask } from 'primereact/inputmask'
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';


import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, withAuthenticator, AmplifySignOut, AmplifyConfirmSignIn } from '@aws-amplify/ui-react'


import Signup from './SignupForm'
class UserManagement extends Component<{},Login> {
    constructor(props:{}){
        super(props)
        this.state = {
            hasAccount: true,
            username : '',
            password : ''
        }
        this.handleSignup = this.handleSignup.bind(this)
    }
    handleSignup(){
          
        
    }
    render() {
        if(this.state.hasAccount===true){
        return (
            <div>
        
            <div className="usermanagement"  style={{ textAlign: 'center', width: '350px', marginLeft: '40%', marginTop: '10%' }}>
                <Card title="Sign In" subTitle="Sign in to your watchdog system">
                <div className="p-grid p-fluid">
                    <div style={{margin:'0px auto'}} className="p-col-12 p-md-8">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Username" />
                    </div>
                    </div>
                    <div style={{margin:'0px auto'}} className="p-col-12 p-md-8">
                    <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-key"></i>
                    </span>
                    <Password placeholder='Password'  value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
                    </div>
                    </div>
                    <span>Don't have an account? Create one now <Button  label="here!" style={{ textAlign: 'center', width: '100px'}} className="p-button-link" onClick={()=>this.setState({hasAccount:false})} /></span>
                    <div style={{margin:'0px auto'}} className="p-col-12 p-md-`8`">
                    <div className="p-inputgroup">
                    
                    <Button style={{margin:'0px auto'}} type="button" label="Submit" onClick={this.handleSignup}/>
                    </div>
                    
                    </div>
                    
                </div>
                </Card>
            </div>
      
    </div> 
        )
        }else{
            return(
                <Signup/>
            )
        }
            
            // <div>
            //     <AmplifyAuthenticator  >
            //         <AmplifySignUp
            //             slot="sign-up"
            //             headerText="Create your Watchdog Account"
            //             formFields={[
            //                 {
            //                     type: "username",
            //                     label: "Username",
            //                     placeholder: "Create a username",
            //                     required: false,
            //                 },
            //                 {
            //                     type: "name",
            //                     label: "Full Name",
            //                     placeholder: "Enter your full name",
            //                     required: false,
            //                 },
            //                 {
            //                     type: "email",
            //                     label: "Email Address",
            //                     placeholder: "Enter your email address",
            //                     required: true,
            //                 },
            //                 {
            //                     type: "password",
            //                     label: "Password",
            //                     placeholder: "Enter your password",
            //                     required: true,
            //                 },
            //                 {
            //                     type: "phone_number",
            //                     label: "Phone Number",
            //                     placeholder: "Phone Number",
            //                     required: false,
            //                 },
            //                 {
            //                     type: "address",
            //                     label: "Address",
            //                     placeholder: "Enter your address",
            //                     required: false,
            //                 },
            //             ]}
            //         />
            //         <AmplifySignIn
            //             slot="sign-in"
            //             headerText="Sign into your Watchdog Account"

            //         />
            //         <AmplifyConfirmSignIn
            //             headerText="Please verify email"
            //             slot="confirm-sign-up"
            //             formFields={[

            //             ]}
            //             submitButtonText="Okay"
            //             handleSubmit={event => this.signIn(event)}
            //         />

            //     </AmplifyAuthenticator>

            // </div>
            
        // );
    }
}

export default UserManagement;