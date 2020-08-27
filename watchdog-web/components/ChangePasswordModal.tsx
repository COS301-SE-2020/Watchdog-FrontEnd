import React, { Component } from 'react'
import { propsChangePasswordModal, stateChangePasswordModal } from '../interfaces'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Password } from 'primereact/password'
import  { Auth } from 'aws-amplify'
import { Toast } from 'primereact/toast'

class ChangePasswordModal extends Component<propsChangePasswordModal, stateChangePasswordModal> {
    constructor(props: propsChangePasswordModal) {
        super(props)
        this.state = {
            old_password: "",
            new_password: "",
            confirm_password: ""
        }

        this.passwordChange = this.passwordChange.bind(this)
    }

    async passwordChange(){
        //check not null
        //check old==new
        //check new==confirm
        //data checks regex
        if(this.state.old_password===""){
         this.toast.show({severity:'error', summary: 'Error', detail:'Please enter your old password', life: 3000})
          return
        }
  
        if(this.state.new_password===""){
            this.toast.show({severity:'error', summary: 'Error', detail:'Please enter your new password', life: 3000})
        //   Alert.error("Please enter your new password", 3000)
          return
        }
  
        if(this.state.confirm_password===""){
            this.toast.show({severity:'error', summary: 'Error', detail:'Please confirm your new password', life: 3000})
        //   Alert.error("Please confirm your new password", 3000)
          return
        }
  
        if(this.state.confirm_password !== this.state.new_password){
            this.toast.show({severity:'error', summary: 'Error', detail:'Passwords dont match', life: 3000})
        //   Alert.error("Passwords dont match", 3000)
          return
        }
  
        if(!this.state.new_password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
            this.toast.show({severity:'error', summary: 'Error', detail:'Invalid Password. Password must be 8 characters long, contain: an uppercase character, a number and a special character', life: 3000})
        //   Alert.error("Invalid Password. Password must be 8 characters long, contain: an uppercase character, a number and a special character", 3000)
          return
        }
  
        try {
          let currentUser = await Auth.currentAuthenticatedUser();
          await Auth.changePassword(
            currentUser,
            this.state.old_password,
            this.state.new_password
          ).then(
            ()=>{
            //   Alert.success("Password changed",3000)
            this.toast.show({severity:'success', summary: 'Error', detail:'Password changed', life: 3000})
  
              this.setState({old_password : "",
              new_password : "",
              confirm_password : ""})
             
            }
            
          );
    
          
        } catch (error) {
          //Alert.error(error)
          this.toast.show({severity:'error', summary: 'Error', detail:'Incorrect current password', life: 3000})
        //   Alert.error("Incorrect current password", 3000)
          console.log(error)
         
            
        }
        //console.log("sdad")
  
        this.setState({old_password : "",
                        new_password : "",
                        confirm_password : ""})
        
        this.props.hide_modal(false)
        
  
  
  
      }
    
    

    render() {
        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                <Dialog header="Change Password" visible={this.props.show_modal} modal
                    style={{ width: '350px' }} footer={<div>
                        <Button label="Close" icon="pi pi-times" onClick={() => {
                            this.setState({old_password : "",
                            new_password : "",
                            confirm_password : ""})
                            this.props.hide_modal(false)}} className="p-button-text" />
                        <Button label="Update" icon="pi pi-check" onClick={() => this.passwordChange()} autoFocus />
                    </div>} onHide={() => { 
                        this.setState({old_password : "",
                        new_password : "",
                        confirm_password : ""})
                        this.props.hide_modal(false) }}>
                    <div className="confirmation-content">
                        <Card>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12 p-md-12">
                                    <label htmlFor="phone">Current Password</label>
                                    <Password value={this.state.old_password} onChange={val => this.setState({old_password: val.target.value})} tooltip='Enter Current Password' feedback={false} />

                                </div>
                                <div className="p-field p-col-12 p-md-12">
                                    <label htmlFor="phone">New Password</label>
                                    <Password value={this.state.new_password} onChange={val => this.setState({new_password: val.target.value})} tooltip='Should contain at least 8 characters, numeric character,  uppercase character,  lowercase character and a special character' />

                                </div>
                                <div className="p-field p-col-12 p-md-12">
                                    <label htmlFor="phone">Confirm New Password</label>
                                    <Password value={this.state.confirm_password} onChange={val => this.setState({confirm_password: val.target.value})} tooltip='Retype your new password' feedback={false} />

                                </div>
                            </div>
                        </Card>
                    </div>
                </Dialog>

            </div>
        );
    }
}

export default ChangePasswordModal;