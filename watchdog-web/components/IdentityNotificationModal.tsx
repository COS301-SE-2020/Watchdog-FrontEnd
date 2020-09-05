import React, { Component } from 'react';
import { propsIdentityNotificationModal, stateIdentityNotificationModal } from '../interfaces'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputSwitch } from 'primereact/inputswitch'

class IdentityNotificationModal extends Component<propsIdentityNotificationModal, stateIdentityNotificationModal> {
    
    constructor(props: propsIdentityNotificationModal) {
        super(props)
        this.handleClose = this.handleClose.bind(this)

    }

    handleClose() {

        this.props.hide_modal(false)
    }
    static getDerivedStateFromProps(props, state) : stateIdentityNotificationModal{
        if(props.monitor!==null){
           return({message : props.monitor.custom_message, 
            watch : props.monitor.watch, 
            loading : false}) 
        }

        return {
            loading: false,
            message: '',
            watch: 0
        }
        
        

    }


    render() {
        
        return (
            <Dialog header={"Notifications: " + this.props.name} position='top' visible={this.props.show_modal}
                modal style={{ width: '400px' }} footer={<div>
                    <Button disabled={this.state.loading} label="Close" icon="pi pi-times" onClick={() => this.handleClose()} className="p-button-text" />
                    <Button disabled={this.state.loading} label="Update" icon="pi pi-check" onClick={() => this.handleClose()} autoFocus />
                </div>} onHide={() => { this.handleClose() }}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-12">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                            <InputSwitch  tooltip="Receive Notification?" checked={this.state.watch == 1 ? true : false} onChange={(e) => e.value == true ? this.setState({ watch: 1 }) : this.setState({ watch: 0 })} />
                            </span>
                            <InputText placeholder='Custom Notification Message' tooltip={'Custom Notification Message'} value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} />
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default IdentityNotificationModal;