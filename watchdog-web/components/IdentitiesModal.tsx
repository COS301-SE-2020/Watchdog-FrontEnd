import React, { Component } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { stateIdentitiesModal, propsIdentitiesModal } from '../interfaces'
import Identities from './Identities'
import { getIdentities } from '../api'
import { Toast } from 'primereact/toast'
import AddIdentityModal from "./AddIdentityModal"

class IdentitiesModal extends Component<propsIdentitiesModal, stateIdentitiesModal> {
    constructor(props : propsIdentitiesModal){
        super(props)
        this.state = {
            loading : false,
            data : [],
            add_identities_modal : false
        }
        this.getData = this.getData.bind(this)
        this.toggleAddIdentitiesModal = this.toggleAddIdentitiesModal.bind(this)
    }

    toggleAddIdentitiesModal(val: boolean, reload: boolean | null) {
        this.setState({ add_identities_modal: val })
        if (reload) {

            this.toast.show({ severity: 'success', summary: 'Identity Added', detail: 'Identity added to whitelist.', life: 3000 })
            this.setState({ loading: true })

            let currentDate
            const date = Date.now()
            do {
                currentDate = Date.now()
            } while (currentDate - date < 5000)
            this.getData()

        }

    }

    async getData(){
        this.setState({ loading: true, data: [] })

        await getIdentities((res) => {
            console.log(res)
            let users = res.data.data.profiles
            let format = users.map((item, index) => {
                let el = {
                    id: item.index,
                    name: item.name,
                    img: item.path_in_s3,
                    monitor: item.monitor,
                    img_key: item.key
                }
                return el
            })

            this.setState({ data: format })

        }, () => {
            this.toast.show({ severity: 'error', summary: 'Error', detail: 'Unable to get identities. Please check your internet and refresh your browser', life: 3000 })

        })

        this.setState({ loading: false })

    }
    componentDidMount(){
        this.getData()
    }
    render() {
        return (
            <div>
                <Dialog header="Identity Settings" visible={this.props.show_modal}
                    maximizable modal style={{ width: '80%', maxWidth: '1700px' }} footer={<div>
                        <Button label="New Identity" icon="pi pi-plus" onClick={() => this.toggleAddIdentitiesModal(true, null)} className="p-button-text" />
                    </div>}

                    onHide={() => { this.props.hide_modal(false) }}>

                    <div style={{ height: '65vh' }}>
                        <Identities data = { this.state.data} loading = {this.state.loading} getData= {this.getData}/>
                        <Toast ref={(el) => this.toast = el} />
                        <AddIdentityModal hide_modal={this.toggleAddIdentitiesModal} show_modal={this.state.add_identities_modal} />
                    </div>

                </Dialog>

            </div>
        );
    }
}

export default IdentitiesModal;