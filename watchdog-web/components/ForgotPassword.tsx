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

class ForgotPassword extends Component<{}, ForgotPasswordState> {
    
    constructor(props : {}){
        super(props)
        this.state = {
            stage:0,
            email:'',
            code:'',
            loading: false,
            password:'',
            confirmPassword:''
        }

        this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this)
        this.handleNewPassword = this.handleNewPassword.bind(this)
    }
    handleUsernameSubmit(){
        Auth.forgotPassword(this.state.email).then(()=>this.setState({stage: 1})).catch((err=>console.log(err)))

    }

    handleNewPassword(){
        Auth.forgotPasswordSubmit(this.state.email, this.state.code, this.state.password).then(()=>{this.setState({stage : 3})}).catch(err=>{console.log(err)})

    }
    render() {
        if(this.state.stage===0){
        return (
            <div style={{ maxWidth: "1700px", height: '90vh', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            


            <div className="p-grid">
                <div className="p-col-12 p-md-12" style={{ display: 'flex', alignContent: 'center', textAlign: 'center' }} >
                    <Card  style={{ maxWidth: '350px' }}  subTitle="Please enter your username">
                        <div className="p-field p-grid">

                            <div className="p-inputgroup">
                                
                                <InputText disabled={this.state.loading} value={this.state.email} placeholder="Username" onChange={(e) => { this.setState({ email: e.target.value}) }} />
                            </div>


                        </div>
                        <div className="p-field p-grid">

                            <div className="p-inputgroup">
                                
                                <Button disabled={this.state.loading} style={{ margin: '0px auto' }} type="button" label="Submit" onClick={()=>{this.handleUsernameSubmit()}} />
                            </div>


                        </div>
    
                        
                    </Card>
                    

                </div>
                <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>

            </div>
        </div>
        );
        }else if(this.state.stage===1){
            return(
            <div style={{ maxWidth: "1700px", height: '90vh', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            


            <div className="p-grid">
                <div className="p-col-12 p-md-12" style={{ display: 'flex', alignContent: 'center', textAlign: 'center' }} >
                    <Card  style={{ maxWidth: '350px' }}  subTitle="Please enter the verification code sent to your email">
                        <div className="p-field p-grid">

                            <div className="p-inputgroup">
                                
                                <InputText disabled={this.state.loading} value={this.state.code} placeholder="Verification Code" onChange={(e) => { this.setState({ code: e.target.value}) }} />
                            </div>


                        </div>
                        <div className="p-field p-grid">

                            <div className="p-inputgroup">
                                
                                <Button disabled={this.state.loading} style={{ margin: '0px auto' }} type="button" label="Submit" onClick={()=>{this.setState({stage:2})}} />
                            </div>


                        </div>
    
                        
                    </Card>
                    

                </div>
                <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>

            </div>
        </div>
            );

        }else if(this.state.stage===2){
            return(
                <div style={{ maxWidth: "1700px", height: '90vh', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            


            <div className="p-grid">
                <div className="p-col-12 p-md-12" style={{ display: 'flex', alignContent: 'center', textAlign: 'center' }} >
                    <Card  style={{ maxWidth: '350px' }}  subTitle="Enter you new Password">
                        <div className="p-field p-grid">

                            <div className="p-inputgroup">
                                
                                <Password disabled={this.state.loading} value={this.state.password} placeholder="New Password" onChange={(e) => { this.setState({ password: e.target.value}) }} />
                            </div>


                        </div>
                        <div className="p-field p-grid">

                            <div className="p-inputgroup">
                                
                                <Password disabled={this.state.loading} value={this.state.confirmPassword} placeholder="Confirm Password" onChange={(e) => { this.setState({ confirmPassword: e.target.value}) }} />
                            </div>


                        </div>
                        <div className="p-field p-grid">

                            <div className="p-inputgroup">
                                
                                <Button disabled={this.state.loading} style={{ margin: '0px auto' }} type="button" label="Submit" onClick={()=>{this.handleNewPassword()}} />
                            </div>


                        </div>
    
                        
                    </Card>
                    

                </div>
                <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>

            </div>
        </div>
            );
        }else{
            return(
                <UserManagement/>
            );
        }
    
        
    }
}

export default ForgotPassword;