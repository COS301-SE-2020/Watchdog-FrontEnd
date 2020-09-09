import React, { Component } from 'react';
import { propsIdentityNotificationModal, stateIdentityNotificationModal } from '../interfaces'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputSwitch } from 'primereact/inputswitch'
import { updateIdentityNotification } from '../api'
import { ProgressBar } from 'primereact/progressbar'
import { Toast } from 'primereact/toast'

class IdentityNotificationModal extends Component<propsIdentityNotificationModal, stateIdentityNotificationModal> {

    constructor(props: propsIdentityNotificationModal) {
        super(props)
        this.state = {
            monitor :this.props.monitor,
            loading: false,
            user_key: null
        }



        this.handleClose = this.handleClose.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)

    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({monitor: nextProps.monitor})

    }



    

    async handleUpdate() {
        this.setState({ loading: true, user_key: this.props.user_key })
        updateIdentityNotification(this.props.user_key, this.state.message || this.props.monitor.custom_message, this.state.watch || this.props.monitor.watch, () => {
            this.setState({
                monitor : null,
                loading: false,
                user_key: null

            })
            this.props.hide_modal(false, true)

        }, () => {
            this.toast.show({ severity: 'error', summary: 'Error', detail: 'Unable to update notification settings. Please try again', life: 3000 })
            this.setState({loading: false})
        })




    }

    handleClose() {
        this.setState({
            monitor : null,
            loading: false,
            user_key: null

        })

        this.props.hide_modal(false)
    }





    render() {



        return (
            <Dialog header={"Notifications: " + this.props.name} position='top' visible={this.props.show_modal}
                modal style={{ width: '400px' }} footer={<div>
                    <Button disabled={this.state.loading} label="Close" icon="pi pi-times" onClick={() => this.handleClose()} className="p-button-text" />
                    <Button disabled={this.state.loading} label="Update" icon="pi pi-check" onClick={() => this.handleUpdate()} autoFocus />
                </div>} onHide={() => { this.handleClose() }}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-12">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <InputSwitch disabled={this.state.loading} tooltip="Receive Notification?" checked={this.state.monitor?.watch === 1} onChange={(e) => {
                                    console.log(e)
                                    let mon = this.state.monitor
                                    e.value == true ? mon.watch = 1 : mon.watch = 0

                                    this.setState({monitor : mon})
                                }} />
                            </span>
                            <InputText disabled={this.state.loading} placeholder='Custom Notification Message' tooltip={'Custom Notification Message'} value={this.state.monitor?.custom_message} onChange={(e) => {
                                let mon = this.state.monitor
                                mon.custom_message = e.target.value
                                this.setState({ monitor: mon})

                            }} />
                        </div>
                    </div>
                    <Toast  ref={(el) => this.toast = el} />
                    <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>
                </div>
            </Dialog>
        );
    }
}

export default IdentityNotificationModal;