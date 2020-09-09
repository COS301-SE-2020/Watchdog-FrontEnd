import React, { Component } from 'react'
import { propsIdentities, stateIdentities, identity } from '../interfaces'
import { Img } from 'react-image'
import { Button } from 'primereact/button'
import { getIdentities } from '../api'
import { ProgressBar } from 'primereact/progressbar'
import RemoveIdentityModal from './RemoveIdentityModal'
import { Toast } from 'primereact/toast'
import IdentityNotificationModal from './IdentityNotificationModal'
import AddIdentityModal from "./AddIdentityModal";
import { Carousel } from 'primereact/carousel'
import { Card } from 'primereact/card'


const responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '600px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1
    }
]
class Identities extends Component<propsIdentities, stateIdentities> {
    constructor(props: propsIdentities) {
        super(props)
        this.state = {
            data: [],
            loading: true,
            remove_modal: false,
            remove_name: '',
            remove_index: -1,
            notifications_modal: false,
            notifications_name: '',
            notifications_monitor: { custom_message: '', watch: 0 },
            add_identities_modal: false,
            natification_key : ''
        }

        this.getData = this.getData.bind(this)
        this.toggleRemoveModal = this.toggleRemoveModal.bind(this)
        this.toggleNotificationModal = this.toggleNotificationModal.bind(this)
        this.toggleAddIdentitiesModal = this.toggleAddIdentitiesModal.bind(this)
        this.identityTemplate = this.identityTemplate.bind(this)
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

    toggleNotificationModal(val: boolean, reload: boolean | null) {
        this.setState({ notifications_modal: val })
        if (reload) {
            let currentDate
            const date = Date.now()
            do {
                currentDate = Date.now()
            } while (currentDate - date < 5000)
            this.getData()
            this.toast.show({ severity: 'success', summary: 'Updated', detail: 'Identity notification settings updated.', life: 3000 })
            
        }
    }

    toggleRemoveModal(val: boolean, reload: boolean | null) {
        this.setState({ remove_modal: val })
        if (reload) {
            this.getData()
            this.toast.show({ severity: 'success', summary: 'Removed', detail: 'Identity removed.', life: 3000 })
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.data,
            loading: props.state
            
        }
    }

    async getData() {
        this.props.getData()

    }

    componentDidMount() {
        this.getData()

    }

    identityTemplate(identity: identity) {

        return (

            <div className="product-item">
                <div className="product-item-content">
                    <Card className='p-shadow-12'>
                        <div className="p-grid">
                            <div style={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }} className='p-col-12 p-md-12 p-lg-12 '>


                                <Img style={{ height: '350px', width: '350px', objectFit: 'contain' }} src={identity.img} loader={
                                    <i className="pi pi-spin pi-spinner" style={{ 'fontSize': '5em' }}></i>} />


                            </div>
                            <div className='p-col-12 p-md-12 p-lg-12'>
                                <div>
                                    <h2 style={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="p-mb-1">{identity.name}</h2>
                                    {/* <h6 className="p-mt-0 p-mb-3">${product.price}</h6>
                        <span className={`product-badge status-${product.inventoryStatus.toLowerCase()}`}>{product.inventoryStatus}</span> */}
                                    <div style={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="car-buttons p-mt-5">
                                        <Button onClick={() => {
                                            this.setState({ notifications_name: identity.name, notifications_monitor: identity.monitor, natification_key : identity.img_key })
                                            this.toggleNotificationModal(true, null)
                                        }} icon="pi pi-bell" className="p-button p-button-rounded p-mr-2" />

                                        <Button onClick={() => {
                                            
                                            this.setState({ remove_name: identity.name || 'No Name', remove_index: identity.id })
                                            this.toggleRemoveModal(true, null)
                                        }} icon="pi pi-times" className="p-button-danger p-button-rounded" />
                                    </div>
                                </div>
                            </div>



                        </div>
                    </Card>
                </div>
            </div>

        )

    }

    render() {
        let identities = this.state.data.map((item, index) => {
            return (
                <div key={index + 1} className='p-col-12 p-md-6 p-lg-3'>
                    <div className="p-grid p-shadow-6" style={{ paddingBottom: '5px' }}>
                        <div className=' p-col-12 '>
                            <div style={{ height: '200px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                <Img style={{ width: '100%', height: '200px', objectFit: 'contain' }} src={item.img} loader={
                                    <i className="pi pi-spin pi-spinner" style={{ 'fontSize': '5em' }}></i>} />
                            </div>

                        </div>
                        <div className=' p-col-12 ' >
                            <div className="p-text-center p-text-bold">{item.name || 'No Name'}</div>
                        </div>


                        <div className=' p-col-12 ' style={{ textAlign: 'center' }}>
                            <div className="p-grid p-shadow-6">
                                <div className=' p-col-12 p-md-12 p-lg-12  '>
                                    <Button onClick={() => {
                                        this.setState({ notifications_name: item.name, notifications_monitor: item.monitor })
                                        this.toggleNotificationModal(true, null)
                                    }} style={{ width: '100%' }} label="Notifications Settings" className="p-button-raised p-button-warning" />
                                </div>

                                <div className=' p-col-12 p-md-12 p-lg-12 '>
                                    <Button onClick={() => {
                                        this.setState({ remove_name: item.name || 'No Name', remove_index: item.id })
                                        this.toggleRemoveModal(true, null)
                                    }} style={{ width: '100%' }} label="Remove Identity" className="p-button-raised p-button-danger" />
                                </div>

                            </div>



                        </div>


                    </div>
                </div>
            )

        })
        return (
            <div className="p-grid">
                <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>
                <div className='p-col-12 p-md-12 p-lg-12'>
                    <div className="card">
                        <Carousel value={this.state.data} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions}
                            itemTemplate={this.identityTemplate} />
                    </div>

                </div>
                

                {/* <div className='p-col-12 p-md-6 p-lg-3'>
                    <div style={{ height: '100%', alignItems: 'center', justifyContent: 'center', display: !this.state.loading ? 'flex' : 'none' }} className='p-jc-center'>
                        <Button onClick={() => this.toggleAddIdentitiesModal(true, null)} label="New Identity" icon="pi pi-plus" className="p-button-info p-button-raised p-button-text p-button-lg" />
                    </div>

                </div>
                {identities} */}
                <Toast ref={(el) => this.toast = el} />
                < AddIdentityModal hide_modal={this.toggleAddIdentitiesModal} show_modal={this.state.add_identities_modal} />
                <IdentityNotificationModal user_key={this.state.natification_key} monitor={this.state.notifications_monitor} name={this.state.notifications_name} show_modal={this.state.notifications_modal} hide_modal={this.toggleNotificationModal} />
                <RemoveIdentityModal name={this.state.remove_name} index={this.state.remove_index} show_modal={this.state.remove_modal} hide_modal={this.toggleRemoveModal} />


            </div>
        );
    }
}

export default Identities;