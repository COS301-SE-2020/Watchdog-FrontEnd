import React, { Component } from 'react';
import { propsRemoveIdentityModal, stateRemoveIdentityModal } from '../interfaces'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { deleteIdentity } from '../api'
import { Toast } from 'primereact/toast'
import { ProgressBar } from 'primereact/progressbar'

class RemoveIdentityModal extends Component<propsRemoveIdentityModal, stateRemoveIdentityModal> {
    constructor(props: propsRemoveIdentityModal) {
        super(props)
        this.state = {
            loading : false
        }
        this.handleRemove = this.handleRemove.bind(this)
    }

    handleRemove() {
        this.setState({loading : true})
        
        deleteIdentity(this.props.index, ()=>{
            this.props.hide_modal(false, true)
            this.setState({loading : false})

        }, ()=>{
            this.toast.show({severity:'error', summary: 'Error', detail:'Unable to delete identity. Please try again', life: 3000});
            this.setState({loading : false})
        })




        

    }

    render() {
        return (
            <Dialog header="Delete Identity" visible={this.props.show_modal} modal
                style={{ width: '350px' }} footer={<div>
                    <Button disabled={this.state.loading} label="NO" icon="pi pi-times" onClick={() => {
                        this.setState({loading : false})
                        this.props.hide_modal(false)}} className="p-button-text" />
                    <Button disabled={this.state.loading} label="YES" icon="pi pi-check" onClick={() => {
                        this.handleRemove()

                    }} autoFocus />
                </div>}
                onHide={() => { 
                    this.setState({loading : false})
                    this.props.hide_modal(false) }}>
                <Toast ref={(el) => this.toast = el} />
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    <span>Are you sure you want to remove {this.props.name} as an identity?</span>
                    <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>
                </div>
            </Dialog>
        )
    }
}

export default RemoveIdentityModal