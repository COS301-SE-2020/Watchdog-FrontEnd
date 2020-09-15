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
import { tooltip } from 'aws-amplify'
import { LazyLoadImage } from 'react-lazy-load-image-component'


const responsiveOptions = [
    
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

    componentDidUpdate = () => {

        console.log(this.props.data);
    }

    identityTemplate(identity: identity) {

        return (

            <div className="product-item">
                <div className="product-item-content">
                    <Card className='p-shadow-12'>
                        <div className="p-grid">
                            <div style={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }} className='p-col-12 p-md-12 p-lg-12 '>


                            <LazyLoadImage placeholder={<i className="pi pi-spin pi-spinner" style={{'fontSize': '5em'}}></i>}  style={{ maxHeight: '350px', width: '100%', objectFit: 'contain', maxWidth: '80vw' }} src={identity.img} />


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
                                        }} tooltipOptions={{position : 'bottom'}} tooltip ='Notification Settings' icon="pi pi-bell" className="p-button p-button-rounded p-mr-2 p-notify" />

                                        <Button onClick={() => {
                                            
                                            this.setState({ remove_name: identity.name || 'No Name', remove_index: identity.id })
                                            this.toggleRemoveModal(true, null)
                                        }} tooltipOptions={{position : 'bottom'}} tooltip ='Remove Identity' icon="pi pi-times" className="p-button-danger p-button-rounded p-remove"  />
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
        
        return (
            <div className="p-grid">
                <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>
                <div className='p-col-12 p-md-12 p-lg-12'>
                    <div className="card">
                        <Carousel circular={true} value={this.state.data} numVisible={1} numScroll={1} responsiveOptions={responsiveOptions}
                            itemTemplate={this.identityTemplate} />
                    </div>

                </div>
                

                
                <Toast ref={(el) => this.toast = el} />
                < AddIdentityModal hide_modal={this.toggleAddIdentitiesModal} show_modal={this.state.add_identities_modal} />
                <IdentityNotificationModal user_key={this.state.natification_key} monitor={this.state.notifications_monitor} name={this.state.notifications_name} show_modal={this.state.notifications_modal} hide_modal={this.toggleNotificationModal} />
                <RemoveIdentityModal name={this.state.remove_name} index={this.state.remove_index} show_modal={this.state.remove_modal} hide_modal={this.toggleRemoveModal} />


            </div>
        );
    }
}

export default Identities;