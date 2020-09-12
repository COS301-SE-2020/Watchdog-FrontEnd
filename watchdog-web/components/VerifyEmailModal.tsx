import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import {sendVerification} from '../api'
import { propsVerifyEmailModal, stateVerifyEmailModal } from '../interfaces'
import { ProgressBar } from 'primereact/progressbar'

class VerifyEmailModal extends Component<propsVerifyEmailModal, stateVerifyEmailModal> {
    constructor(props: propsVerifyEmailModal) {
        super(props)
        this.state = {
            step: 0,
            loading : false
        }

        this.handleClose = this.handleClose.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    async handleSubmit() {
        this.setState({loading: true})
        await sendVerification((e)=>{
            console.log(e);
            this.setState({ step: 1 })
            

        }, (e)=>{
            console.log(e);
            

        })
        
        this.setState({loading: false})

    }

    handleClose() {
        this.setState({ step: 0 })
        this.props.hide_modal(false)

    }



    render() {
        return (
            <div>
                <Dialog header="Verify Email" visible={this.props.show_modal} modal style={{ width: '350px', maxWidth: '100vw' }}
                    footer={
                        <div>
                            <div style={{ display: this.state.step === 0 ? 'block' : 'none' }} >
                                <Button disabled={this.state.loading} label="No" icon="pi pi-times" onClick={() => { this.handleClose() }} className="p-button-text" />
                                <Button disabled={this.state.loading} label="Yes" icon="pi pi-check" onClick={() => { this.handleSubmit()}} autoFocus />
                            </div>
                            <div style={{ display: this.state.step === 1 ? 'block' : 'none' }}>
                                <Button disabled={this.state.loading} label="Okay" icon="pi pi-check" onClick={() => { this.props.hide_modal(false) }} className="p-button-text" />

                            </div>
                        </div>
                    } onHide={() => { this.handleClose()}}>
                    <div className="p-grid">

                        <div style={{ display: this.state.step === 0 ? 'block' : 'none' }} className="confirmation-content p-field p-col-12 p-md-12">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            <span>Do you want to verify your email?</span>
                        </div>

                        <div style={{ display: this.state.step === 1 ? 'block' : 'none' }} className="confirmation-content p-field p-col-12 p-md-12">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            <span>An Email verification has been sent.</span>
                        </div>

                        <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>
                    </div>
                </Dialog>

            </div>
        );
    }
}

export default VerifyEmailModal;