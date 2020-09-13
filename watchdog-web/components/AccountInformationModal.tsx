import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

import {propsAccountInformationModal, stateAccountInformationModal} from '../interfaces'

class AccountInformationModal extends Component<propsAccountInformationModal, stateAccountInformationModal> {
    render() {
        return (
            <Dialog header="Account Information" visible={this.props.show_modal} modal
                style={{ width: '450px', maxWidth: '100vw' }} footer={<div>
                    <Button  label="Close" icon="pi pi-times" onClick={async () => {
                        
                        this.props.hide_modal(false)
                    }} className="p-button-text" />
                   
                </div>} onHide={async () => {
                    
                    this.props.hide_modal(false)
                }}>
                <div className="confirmation-content">

                </div>
            </Dialog>
        );
    }
}

export default AccountInformationModal;