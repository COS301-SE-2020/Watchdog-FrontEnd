import React, { Component } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { stateNotificationModal, propsNotificationModal } from '../interfaces'
import { InputMask } from 'primereact/inputmask'
import { Dropdown } from 'primereact/dropdown';


class NotificationModal extends Component<propsNotificationModal, stateNotificationModal> {
    constructor(props : propsNotificationModal){
        super(props)
        this.state = {
            security_company : '',
            notification_type : {name : '', code : ''}
        }
    }
    render() {
        return (
            <div>
                <Dialog header="Notification Settings" visible={this.props.show_modal} modal
                    style={{ width: '350px' }} footer={<div>
                        <Button label="Close" icon="pi pi-times" onClick={() => this.props.hide_modal(false)} className="p-button-text" />
                        <Button label="Update" icon="pi pi-check" onClick={() => this.props.hide_modal(false)} autoFocus />
                    </div>} onHide={() => { this.props.hide_modal(false) }}>
                    <div className="confirmation-content">
                        <Card>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12 p-md-12">
                                <label htmlFor="phone">Notification Type</label>
                                    <Dropdown value={this.state.notification_type} onChange={val => this.setState({notification_type : val.value})}
                                     options={[
                                        { name: 'Email', code: 'email' },
                                        { name: 'SMS', code: 'sms' },
                                        { name: 'Push', code: 'push' }]}  optionLabel="name" placeholder="Notification Type" />
                                </div>
                                <div className="p-field p-col-12 p-md-12">
                                    <label htmlFor="phone">Security Company</label>
                                    <InputMask id="phone" value={this.state.security_company} mask="(999) 999-9999" onChange={val=>this.setState({security_company : val.value})} placeholder="(999) 999-9999" ></InputMask>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Dialog>

            </div>
        );
    }
}

export default NotificationModal;