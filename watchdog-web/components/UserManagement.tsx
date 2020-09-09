import React, { Component } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { stateNotificationModal, Login } from '../interfaces'
import { InputMask } from 'primereact/inputmask'
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password'
import { ProgressBar } from 'primereact/progressbar'
import { Toast } from 'primereact/toast'


import { Auth } from 'aws-amplify'


import Signup from './SignupForm'
import ForgotPassword from './ForgotPassword'
class UserManagement extends Component<{}, Login> {
    constructor(props: {}) {
        super(props)
        this.state = {
            hasAccount: true,
            username: '',
            password: '',
            loading : false,
            stage: 0
        }
        this.handleSignup = this.handleSignup.bind(this)
        this.handleforgot=this.handleforgot.bind(this)
    }
    handleSignup() {
        this.setState({loading: true})
        Auth.signIn(this.state.username, this.state.password).then((e)=>console.log('signed in')).catch((err)=>{
            this.toast.show({ severity: 'error', summary: 'Error', detail: 'Login Failed. Please make sure your username and password is correct', life: 3000 })
            this.setState({loading: false})
        })
        



    }
    handleforgot(){
        console.log("here")
        return(
            <ForgotPassword/>
        )
    }

    componentDidMount(){
        this.setState({loading : false})
    }
    render() {
        if (this.state.stage===0) {
            return (
                <div style={{ maxWidth: "1700px", height: '90vh', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Toast ref={(el) => this.toast = el} />


                    <div className="p-grid">
                        <div className="p-col-12 p-md-12" style={{ display: 'flex', alignContent: 'center', textAlign: 'center' }} >
                            <Card  style={{ maxWidth: '350px' }} title="Sign In" subTitle="Sign in to your watchdog system">
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
                                            <i className="pi pi-key"></i>
                                        </span>
                                        <Password disabled={this.state.loading} feedback={false} placeholder='Password' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                                        <span><Button disabled={this.state.loading} label="Forgot Password?" style={{ textAlign: 'center', maxWidth: '100px' }} className="p-button-link" onClick={() => this.setState({ stage: 2 })} /></span>

                                    </div>


                                </div>
                                <div className="p-field p-grid">
                                    <div className="p-inputgroup">
                                        <Button disabled={this.state.loading} style={{ margin: '0px auto' }} type="button" label="Login" onClick={this.handleSignup} />
                                    </div>
                                </div>
                                <span>Don't have an account? Create one now <Button disabled={this.state.loading} label="here!" style={{ textAlign: 'center', maxWidth: '100px' }} className="p-button-link" onClick={() => this.setState({ stage: 1 })} /></span>
                            </Card>
                            

                        </div>
                        <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>

                    </div>
                </div>

            )
        } else if(this.state.stage===1) {
           
            return(
                <Signup/>
            );
        }
            else{
                console.log(" here")
                return(
                    
                    <ForgotPassword/>
                )
            } 
    }
}

export default UserManagement;