import React, { Component } from 'react';

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { stateNotificationModal, Login } from '../interfaces'
import { InputMask } from 'primereact/inputmask'
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Signup} from './../interfaces/index'
import UserManagement from './UserManagement';
class SignupForm extends Component<{},Signup> {
    constructor(props:{}) {
        super(props);
        this.state = { 
                username: '',
                fullname: '',
                email: '',
                password: '',
                address: '',
                hasSignedup: false,
                Verified: false
         };
    
    }
   
    render() {
        if(!this.state.hasSignedup){
        return (
            
                <div>
        
                <div className="usermanagement"  style={{ textAlign: 'center', width: '350px', marginLeft: '40%', marginTop: '10%' }}>
                    <Card title="Sign Up" subTitle="Create Your Watchdog account">
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
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Full Name" />
                        </div>
                        </div>
                        <div style={{margin:'0px auto'}} className="p-col-12 p-md-8">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-bookmark"></i>
                            </span>
                            <InputText placeholder="Email Address" />
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
                        <div style={{margin:'0px auto'}} className="p-col-12 p-md-8">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-sort-numeric-down-alt"></i>
                            </span>
                            <InputMask mask="999-999 9999" placeholder="Phone Number" />
                        </div>
                        </div>
                        <div style={{margin:'0px auto'}} className="p-col-12 p-md-8">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-home"></i>
                            </span>
                            <InputText placeholder="Physical Address" />
                        </div>
                        </div>
                        
                        
                        <div style={{margin:'0px auto'}} className="p-col-12 p-md-`8`">
                        <div className="p-inputgroup">
                        
                        <Button style={{margin:'0px auto'}} type="button" label="Submit" onClick={()=>this.setState({hasSignedup: true})}/>
                        </div>
                        
                        </div>
                        
                    </div>
                    </Card>
                </div>
          
        </div>   
            
            
        );
    }else{
        if(!this.state.Verified){
        return(
            
            <Card>
           
            
            
            <div style={{margin:'0px auto'}} className="p-col-12 p-md-`8`">
            <div className="p-inputgroup">
            <h2 style={{margin:'0px auto'}}>Verifcation Email Sent!</h2>
            
            </div>
            
            </div>
            <div style={{margin:'0px auto'}} className="p-col-12 p-md-`8`">
            <div className="p-inputgroup">
            <h4 style={{margin:'0px auto'}}>Please Verify your email and  </h4>
            
            </div>
            
            </div>
            <div style={{margin:'0px auto'}} className="p-col-12 p-md-`8`">
            <div className="p-inputgroup">
            <Button style={{margin:'0px auto',textAlign: 'center'}} label="Login"  className="p-button-link" onClick={()=>this.setState({Verified:true})} />
            
            </div>
            
            </div>
        </Card>
        )
        }else{
            return(
                <UserManagement/>
            )
        }
    }
    }
}

export default SignupForm;