import React, { Component } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { stateNotificationModal, propsNotificationModal } from '../interfaces'
import { InputMask } from 'primereact/inputmask'
import { Dropdown } from 'primereact/dropdown';
import {getNotificationSettings, updateNotification} from '../api'
import { ProgressBar } from 'primereact/progressbar'
import { Toast } from 'primereact/toast'
import { Messages } from 'primereact/messages'
import VerifyEmailModal from './VerifyEmailModal'


class NotificationModal extends Component<propsNotificationModal, stateNotificationModal> {
    constructor(props : propsNotificationModal){
        super(props)
        this.state = {
            security_company : '',
            notification_type : {name : '', code : ''},
            loading : true,
            verifyEmailModal : false
        }

        this.getData = this.getData.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.toggleVerifyEmail = this.toggleVerifyEmail.bind(this)
    }

    toggleVerifyEmail(val : boolean){
        this.setState({verifyEmailModal: val})

    }

    async handleUpdate(){
        this.setState({loading: true})
        await updateNotification('+'+this.state.security_company, this.state.notification_type.code, (e)=>{
            console.log(e.data.data.email_verified)
            this.getData()
            let check =e.data.data.email_verified 
            
            if(check||check==null){
            this.toast.show({ severity: 'success', summary: 'Settings Updated', detail: 'Notification settings updated.', life: 3000 })
            this.props.hide_modal(false)
        }else{
            this.toggleVerifyEmail(true)
            // this.msgs1.show([
            //     { severity: 'error', summary: '', detail: 'Please verify your Email. A verification email has been sent.', sticky: false, life: 5000 }
                
            // ])
            // this.toast.show({ severity: 'error', summary: 'Error', detail: 'Please verify your Email. A verification email has been sent.', life: 3000 })

        }

        }, ()=>{
            this.toast.show({ severity: 'error', summary: 'Error', detail: 'Unable to update notification settings.', life: 3000 })
            this.getData()
        })

        this.setState({loading: false})

    }

    async getData(){
        this.setState({loading: true})
        
        await getNotificationSettings((data)=>{
            let type = { name: 'Push', code: 'push' }
            // console.log(data)
            if(data.type==='email'){
                type = { name: 'Email', code: 'email' }

            }

            if(data.type==='sms'){
                type = { name: 'SMS', code: 'sms' }

            }

            this.setState({notification_type: type, security_company : data.security_company})
        },()=>{})

        this.setState({loading: false})
    }

    componentDidMount(){

        this.getData()
        
    }
    render() {
        return (
            <div>
                <Toast  ref={(el) => this.toast = el} />
                
                <Dialog header="Notification Settings" visible={this.props.show_modal} modal
                    style={{ width: '450px', maxWidth : '100vw'}} footer={<div>
                        <Button disabled={this.state.loading} label="Close" icon="pi pi-times" onClick={async() => {
                            await this.getData()
                            this.props.hide_modal(false)}} className="p-button-text" />
                        <Button disabled={this.state.loading} label="Update" icon="pi pi-check" onClick={() => this.handleUpdate()} autoFocus />
                    </div>} onHide={async () => { 
                        await this.getData()
                        this.props.hide_modal(false) }}>
                    <div className="confirmation-content">
                        <VerifyEmailModal hide_modal={this.toggleVerifyEmail} show_modal={this.state.verifyEmailModal}/>
                        <Card>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12 p-md-12">
                                <Messages ref={(el) => this.msgs1 = el} />
                                <label htmlFor="phone">Notification Type</label>
                                    <Dropdown disabled={this.state.loading} value={this.state.notification_type} onChange={val => this.setState({notification_type : val.value})}
                                     options={[
                                        { name: 'Email', code: 'email' },
                                        { name: 'SMS', code: 'sms' }]}  optionLabel="name" placeholder="Notification Type" />
                                </div>
                                <div className="p-field p-col-12 p-md-12">
                                    <label htmlFor="phone">Security Company</label>
                                    <InputMask disabled={this.state.loading} id="phone" value={this.state.security_company} mask="+99999999999" onChange={val=>this.setState({security_company : val.value})} placeholder="+27 99 999 9999" ></InputMask>
                                </div>
                                <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>
                            </div>
                        </Card>
                    </div>
                </Dialog>

            </div>
        );
    }
}

export default NotificationModal;