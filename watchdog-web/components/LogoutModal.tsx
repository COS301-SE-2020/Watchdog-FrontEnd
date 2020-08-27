import React, { Component } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Auth } from 'aws-amplify'
import {propsLogoutModal, stateLogoutModal} from '../interfaces'

class LogoutModal extends Component<propsLogoutModal, stateLogoutModal> {
    render() {
        return (
            <div>
                <Dialog header="Logout Confirmation"  visible={this.props.show_modal} modal 
                style={{ width: '350px' }} footer={<div>
                    <Button label="NO" icon="pi pi-times" onClick={() => this.props.hide_modal(false)} className="p-button-text" />
                    <Button label="YES" icon="pi pi-check" onClick={() => {
                        this.props.hide_modal(false)
                        Auth.signOut()}} autoFocus />
                </div>} 
                onHide={()=>{this.props.hide_modal(false)}}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        <span>Are you sure you want to Logout?</span>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default LogoutModal;