import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext';
import { Auth } from 'aws-amplify'

import { propsAccountInformationModal, stateAccountInformationModal } from '../interfaces'

class AccountInformationModal extends Component<propsAccountInformationModal, stateAccountInformationModal> {
    constructor(props: propsAccountInformationModal) {
        super(props)
        this.state = {
            name : '',
            email: '',
            phone: '',
            
        }
        this.getUserinfo = this.getUserinfo.bind(this)
        
    }

     getUserinfo(){
        
        Auth.currentUserInfo()
        .then((e) => {
            
            console.log(e);
        })
        .catch(err => console.log(err));
    }
    async componentDidMount(){
        let  idToken  = await Auth.currentSession()
        console.log(idToken)
        await Auth.currentUserInfo()
        .then((e) => {
            console.log(e.attributes)
            this.setState({name: e.attributes.name});
            this.setState({email: e.attributes.email});
            this.setState({phone: e.attributes.phone_number})
        })
        .catch(err => console.log(err));
    }
    
    render() {
        
        return (
            <Dialog header="Account Information" visible={this.props.show_modal} modal
                style={{ width: '450px', maxWidth: '100vw' }} footer={<div>
                    <Button label="Close" icon="pi pi-times" onClick={async () => {

                        this.props.hide_modal(false)
                    }} className="p-button-text" />

                </div>} onHide={async () => {

                    this.props.hide_modal(false)
                }}>
                    
                <div className="confirmation-content">
                    <h5>Full Name:</h5>
                    <InputText style={{width: '400px'}} value={this.state.name} disabled />
                </div>
                <div className="confirmation-content">
                    <h5>Email:</h5>
                    <InputText style={{width: '400px'}} value={this.state.email} disabled />
                </div>
                <div className="confirmation-content">
                    <h5>Phone Number:</h5>
                <InputText style={{width: '400px'}} value={this.state.phone} disabled />
                </div>
            </Dialog>
        );
    }
}

export default AccountInformationModal;