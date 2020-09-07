import React, { Component } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { stateNotificationModal, Login } from '../interfaces'
import { InputMask } from 'primereact/inputmask'
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';


import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, withAuthenticator, AmplifySignOut, AmplifyConfirmSignIn } from '@aws-amplify/ui-react'


import Signup from './SignupForm'
class UserManagement extends Component<{}, Login> {
    constructor(props: {}) {
        super(props)
        this.state = {
            hasAccount: true,
            username: '',
            password: ''
        }
        this.handleSignup = this.handleSignup.bind(this)
    }
    handleSignup() {


    }
    render() {
        if (this.state.hasAccount === true) {
            return (
                <div style={{ maxWidth: "1700px", height: '90vh', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


                    <div className="p-grid">
                        <div className="p-col-12 p-md-12" style={{ display: 'flex', alignContent: 'center', textAlign: 'center' }} >
                            <Card style={{ maxWidth: '350px' }} title="Sign In" subTitle="Sign in to your watchdog system">
                                <div className="p-field p-grid">

                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <InputText value={this.state.username} placeholder="Username" onChange={(e) => { this.setState({ username: e.target.value }) }} />
                                    </div>


                                </div>
                                <div className="p-field p-grid">
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-key"></i>
                                        </span>
                                        <Password feedback={false} placeholder='Password' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                                    </div>

                                </div>
                                <div className="p-field p-grid">
                                    <div className="p-inputgroup">
                                        <Button style={{ margin: '0px auto' }} type="button" label="Login" onClick={this.handleSignup} />
                                    </div>
                                </div>
                                <span>Don't have an account? Create one now <Button label="here!" style={{ textAlign: 'center', maxWidth: '100px' }} className="p-button-link" onClick={() => this.setState({ hasAccount: false })} /></span>
                            </Card>

                        </div>

                    </div>
                </div>

            )
        } else {
            return (
                <Signup />
            )
        }


    }
}

export default UserManagement;