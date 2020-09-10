import React, { Component } from 'react';
import { ForgotPasswordState } from '../interfaces'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputSwitch } from 'primereact/inputswitch'
import { Card } from 'primereact/card'
import { ProgressBar } from 'primereact/progressbar'
import { Password } from 'primereact/password';
import UserManagement from './UserManagement';
import { Auth } from 'aws-amplify'
import { Toast } from 'primereact/toast'


class ForgotPassword extends Component<{ returnSignIn: Function }, ForgotPasswordState> {

    constructor(props: {}) {
        super(props)
        this.state = {
            stage: 0,
            email: '',
            code: '',
            loading: false,
            password: '',
            confirmPassword: ''
        }

        this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this)
        this.handleNewPassword = this.handleNewPassword.bind(this)
    }
    handleUsernameSubmit() {
        this.setState({ loading: true })
        Auth.forgotPassword(this.state.email).then(() => this.setState({ stage: 1, loading: false })).catch((err => {
            console.log(err)
            this.toast.show({ severity: 'error', summary: 'Error', detail: e.message, life: 3000 })
            this.setState({ loading: false })
        }))

    }

    handleNewPassword() {
        this.setState({ loading: true })
        if(this.state.password===''||this.state.confirmPassword===''){
            this.toast_second.show({ severity: 'error', summary: 'Error', detail: 'Password Change Failed. Please make sure all fields are filled in', life: 3000 })
            this.setState({ loading: false })
            return
        }

        if (this.state.confirmPassword !== this.state.password) {
            this.toast_second.show({ severity: 'error', summary: 'Error', detail: 'Password Change Failed. Password and Confirm Password does not match', life: 3000 })
            this.setState({ loading: false })
            return
        }

        Auth.forgotPasswordSubmit(this.state.email, this.state.code, this.state.password).then(() => { this.setState({ stage: 3, loading: false }) }).catch(err => {
            console.log(err)
            this.toast_second.show({ severity: 'error', summary: 'Error', detail: e.message, life: 3000 })
            this.setState({ loading: false })
        })

    }
    render() {
        if (this.state.stage === 0) {
            return (
                <div style={{ maxWidth: "1700px", height: '90vh', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    <Toast ref={(el) => this.toast = el} />

                    <div className="p-grid">
                        <div className="p-col-12 p-md-12" style={{ display: 'flex', alignContent: 'center', textAlign: 'center' }} >
                            <Card style={{ width: '350px', maxWidth: '100vw' }} subTitle="Please enter your username">
                                <div className="p-field p-grid">

                                    <div className="p-inputgroup">

                                        <InputText disabled={this.state.loading} value={this.state.email} placeholder="Username" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                    </div>


                                </div>
                                <div className="p-field p-grid">

                                    <div className="p-inputgroup">

                                        <Button disabled={this.state.loading} style={{ margin: '0px auto' }} type="button" label="Submit" onClick={() => { this.handleUsernameSubmit() }} />
                                    </div>


                                </div>
                                <span><Button disabled={this.state.loading} label="Back To Sign In" style={{ textAlign: 'center', maxWidth: '100%' }} className="p-button-link" onClick={() => this.props.returnSignIn()} /></span>


                            </Card>


                        </div>
                        <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>

                    </div>
                </div>
            );
        } else if (this.state.stage === 1) {
            return (
                <div style={{ maxWidth: "1700px", height: '90vh', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>



                    <div className="p-grid">
                        <div className="p-col-12 p-md-12" style={{ display: 'flex', alignContent: 'center', textAlign: 'center' }} >
                            <Card style={{ width: '350px', maxWidth: '100vw' }} subTitle="Please enter the verification code sent to your email">
                                <div className="p-field p-grid">

                                    <div className="p-inputgroup">

                                        <InputText disabled={this.state.loading} value={this.state.code} placeholder="Verification Code" onChange={(e) => { this.setState({ code: e.target.value }) }} />
                                    </div>


                                </div>
                                <div className="p-field p-grid">

                                    <div className="p-inputgroup">

                                        <Button disabled={this.state.loading} style={{ margin: '0px auto' }} type="button" label="Submit" onClick={() => { this.setState({ stage: 2 }) }} />
                                    </div>


                                </div>
                                <span><Button disabled={this.state.loading} label="Back To Sign In" style={{ textAlign: 'center', maxWidth: '100%' }} className="p-button-link" onClick={() => this.props.returnSignIn()} /></span>


                            </Card>


                        </div>
                        <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>

                    </div>
                </div>
            );

        } else if (this.state.stage === 2) {
            return (
                <div style={{ maxWidth: "1700px", height: '90vh', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    <Toast ref={(el) => this.toast_second = el} />

                    <div className="p-grid">
                        <div className="p-col-12 p-md-12" style={{ display: 'flex', alignContent: 'center', textAlign: 'center' }} >
                            <Card style={{ width: '350px', maxWidth: '100vw' }} subTitle="Enter you new Password">
                                <div className="p-field p-grid">

                                    <div className="p-inputgroup">

                                        <Password disabled={this.state.loading} value={this.state.password} placeholder="New Password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                    </div>


                                </div>
                                <div className="p-field p-grid">

                                    <div className="p-inputgroup">

                                        <Password feedback={false} disabled={this.state.loading} value={this.state.confirmPassword} placeholder="Confirm Password" onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }} />
                                    </div>


                                </div>
                                <div className="p-field p-grid">

                                    <div className="p-inputgroup">

                                        <Button disabled={this.state.loading} style={{ margin: '0px auto' }} type="button" label="Submit" onClick={() => { this.handleNewPassword() }} />
                                    </div>


                                </div>
                                <span><Button disabled={this.state.loading} label="Back To Sign In" style={{ textAlign: 'center', maxWidth: '100%' }} className="p-button-link" onClick={() => this.props.returnSignIn()} /></span>


                            </Card>


                        </div>
                        <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>

                    </div>
                </div>
            );
        } else {
            return (
                <UserManagement />
            );
        }


    }
}

export default ForgotPassword;