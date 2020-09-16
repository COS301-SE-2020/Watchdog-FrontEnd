import React, { Component } from 'react';

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { stateNotificationModal, Login } from '../interfaces'
import { InputMask } from 'primereact/inputmask'
import { ProgressBar } from 'primereact/progressbar'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Signup } from './../interfaces/index'
import UserManagement from './UserManagement';
import { Toast } from 'primereact/toast'
import { Auth } from 'aws-amplify'
import { Captcha } from 'primereact/captcha'

class SignupForm extends Component<{ returnSignIn: Function }, Signup> {
    constructor(props: {}) {
        super(props);
        this.state = {
            username: '',
            fullname: '',
            email: '',
            password: '',
            phone: '',
            address: '',
            hasSignedup: false,
            Verified: false,
            confirmPassword: '',
            loading: false
        };

        this.handleSignUp = this.handleSignUp.bind(this)

    }

    handleSignUp() {
        this.setState({ loading: true })

        if (this.state.username === '' ||
            this.state.email === '' ||
            this.state.fullname === '' ||
            this.state.password === '' ||
            this.state.phone === '' ||
            this.state.address === '' ||
            this.state.confirmPassword === ''

        ) {
            this.toast.show({ severity: 'error', summary: 'Error', detail: 'Signup Failed. Please make sure all fields are filled in', life: 3000 })
            this.setState({ loading: false, password: '', confirmPassword: '' })
            return
        }

        if (this.state.confirmPassword !== this.state.password) {
            this.toast.show({ severity: 'error', summary: 'Error', detail: 'Signup Failed. Password and Confirm Password does not match', life: 3000 })
            this.setState({ loading: false })
            return
        }



        Auth.signUp({
            username: this.state.username,
            password: this.state.password,
            attributes: {
                name: this.state.fullname,
                email: this.state.email,
                phone_number: this.state.phone,
                address: this.state.address
            }

        }).then(() => {
            this.setState({ loading: false, hasSignedup: true })

        }).catch((e) => {
            this.setState({ loading: false })
            this.toast.show({ severity: 'error', summary: 'Error', detail: e.message, life: 3000 })
            console.log(e)
        })

    }



    render() {
        if (!this.state.hasSignedup) {
            return (

                <div style={{ maxWidth: "1700px", height: '90vh', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    <Toast ref={(el) => this.toast = el} />
                    <div className="p-grid">
                        <div className="p-col-12 p-md-12" style={{ display: 'flex', alignContent: 'center', textAlign: 'center' }} >
                            <Card style={{ width: '350px', maxWidth: '100vw' }} title="Sign Up" subTitle="Create Your Watchdog Account">
                                <div className="p-field p-grid">

                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <InputText disabled={this.state.loading} value={this.state.username} placeholder="Username" onChange={(e) => { this.setState({ username: e.target.value }) }} />
                                    </div>


                                </div>
                                <div className="p-field p-grid">

                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <InputText disabled={this.state.loading} value={this.state.fullname} placeholder="Full Name" onChange={(e) => { this.setState({ fullname: e.target.value }) }} />
                                    </div>


                                </div>


                                <div className="p-field p-grid">

                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-bookmark"></i>
                                        </span>
                                        <InputText disabled={this.state.loading} value={this.state.email} placeholder="Email Address" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                    </div>


                                </div>
                                <div className="p-field p-grid">
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-key"></i>
                                        </span>
                                        <Password disabled={this.state.loading} feedback={true} placeholder='Password' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                                    </div>

                                </div>
                                <div className="p-field p-grid">
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-key"></i>
                                        </span>
                                        <Password disabled={this.state.loading} feedback={false} placeholder='Confirm Password' value={this.state.confirmPassword} onChange={(e) => this.setState({ confirmPassword: e.target.value })} />
                                    </div>

                                </div>
                                <div className="p-field p-grid">

                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-sort-numeric-up"></i>
                                        </span>
                                        <InputMask disabled={this.state.loading} mask="+99999999999" value={this.state.phone} placeholder="Phone Number" onChange={(e) => { this.setState({ phone: e.target.value }) }} />
                                    </div>


                                </div>
                                <div className="p-field p-grid">

                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-home"></i>
                                        </span>
                                        <InputText disabled={this.state.loading} value={this.state.address} placeholder="Physical Address" onChange={(e) => { this.setState({ address: e.target.value }) }} />
                                    </div>


                                </div>

                                <div className="p-field p-grid">
                                    <div className="p-inputgroup">
                                        <Button disabled={this.state.loading} style={{ margin: '0px auto' }} type="button" label="Sign Up" onClick={() => this.handleSignUp()} />
                                    </div>
                                </div>
                                <div className="p-field p-grid">
                                    <Captcha siteKey="6Ld-8swZAAAAACf8NCOA1_VJSJgJzF87eEpjcm5z" onResponse={this.showResponse} />
                                </div>
                                <span><Button disabled={this.state.loading} label="Back To Sign In" style={{ textAlign: 'center', maxWidth: '100%' }} className="p-button-link" onClick={() => this.props.returnSignIn()} /></span>
                            </Card>

                        </div>
                        <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>

                    </div>
                </div>


            );
        } else {
            if (!this.state.Verified) {
                return (

                    <div style={{ maxWidth: "1700px", height: '90vh', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


                        <div className="p-grid">
                            <div className="p-col-12 p-md-12" style={{ display: 'flex', alignContent: 'center', textAlign: 'center' }} >
                                <Card style={{ maxWidth: '350px' }} title="Verify" subTitle="An email has been sent you to you to verify your account.">

                                    <div className="p-field p-grid">
                                        <div className="p-inputgroup">
                                            <Button style={{ margin: '0px auto' }} type="button" label="Login" onClick={() => this.setState({ Verified: true })} />
                                        </div>
                                    </div>
                                </Card>

                            </div>

                        </div>
                    </div>
                )
            } else {
                return (
                    <UserManagement />
                )
            }
        }
    }
}

export default SignupForm;