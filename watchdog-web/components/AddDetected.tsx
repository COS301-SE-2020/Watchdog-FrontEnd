import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'
import { propsAddDetected, stateAddDetected } from '../interfaces'
import { InputText } from 'primereact/inputtext'
import { ProgressBar } from 'primereact/progressbar'
import { Toast } from 'primereact/toast'
import { addToWhitelist } from '../api'

class AddDetected extends Component<propsAddDetected, stateAddDetected> {
    constructor(props: propsAddDetected) {
        super(props)
        this.state = {
            name: '',
            loading: false
        }

        this.handleClose = this.handleClose.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
    }
    async handleAdd() {
        this.setState({ loading: true })
        if (this.state.name.length < 1) {
            this.toast.show({ severity: 'error', summary: 'Error', detail: 'Please enter a name for the new identity.', life: 3000 })
            this.setState({ loading: false })
            return
        }

        //
        //console.log(this.state.key_to_update)
        await addToWhitelist(() => {
            
            this.setState({
                name: '',
                loading: false
            })
            this.props.hide_modal(false, true)
        },
            () => {
                this.toast.show({ severity: 'error', summary: 'Error', detail: 'Fail to Add', life: 3000 })
                this.setState({ loading: false })
            }, this.state.name, this.props.update_key)


    }
    handleClose() {
        this.setState({
            name: '',
            loading: false
        })
        this.props.hide_modal(false)
    }
    render() {
        return (
            <Dialog header="Add to Identities" position='top' visible={this.props.show_modal}
                modal style={{ width: '400px' }} footer={<div>
                    <Button disabled={this.state.loading} label="Close" icon="pi pi-times" onClick={() => this.handleClose()} className="p-button-text" />
                    <Button disabled={this.state.loading} label="Add" icon="pi pi-check" onClick={() => this.handleAdd()} autoFocus />
                </div>} onHide={() => { this.handleClose() }}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-12">
                        <label htmlFor="phone">Identity Name:</label>
                        <span className="p-input-icon-left">
                            <i className="pi pi-user-plus" />
                            <InputText disabled={this.state.loading} value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                        </span>
                    </div>
                    <Toast ref={(el) => this.toast = el} />
                    <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>
                </div>
            </Dialog>
        );
    }
}

export default AddDetected;