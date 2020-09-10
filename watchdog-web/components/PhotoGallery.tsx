import React, { Component } from 'react';
import { Galleria } from 'primereact/galleria';
import { Img } from 'react-image'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import RemoveIdentityModal from './RemoveIdentityModal'
import IdentityNotificationModal from './IdentityNotificationModal'

interface PhotoGslleryProps {
    images: any[]
    onUpdateActiveIndex: Function
    activeIndex: number
}
type Monitor = {
    custom_message: string
    watch: number
}
interface PhotoGalleryState {
    loading: boolean
    remove_modal: boolean
    remove_name: string
    remove_index: number
    notifications_modal: boolean
    notifications_name: string
    natification_key: string
    notifications_monitor: Monitor
    add_identities_modal: boolean
}

export class PhotoGallery extends Component<PhotoGslleryProps, PhotoGalleryState> {
    responsiveOptions: { breakpoint: string; numVisible: number; }[];

    constructor(props) {
        super(props);

        // this.state = {
        // images: null
        // };

        // this.galleriaService = new PhotoService();
        this.state = {
            loading: true,
            remove_modal: false,
            remove_name: '',
            remove_index: -1,
            notifications_modal: false,
            notifications_name: '',
            notifications_monitor: { custom_message: '', watch: 0 },
            add_identities_modal: false,
            natification_key: ''
        }
        this.itemTemplate = this.itemTemplate.bind(this);
        this.thumbnailTemplate = this.thumbnailTemplate.bind(this);
        this.caption = this.caption.bind(this);

        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];

        this.getData = this.getData.bind(this)
        this.toggleRemoveModal = this.toggleRemoveModal.bind(this)
        this.toggleNotificationModal = this.toggleNotificationModal.bind(this)
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

    async getData() {
        //this.props.getData()

    }

    componentDidMount() {
        // this.galleriaService.getImages().then(data => this.setState({ images: data }));
    }

    itemTemplate(identity) {

        //this.setState({ notifications_name: identity.name, notifications_monitor: identity.monitor, natification_key: identity.img_key, remove_name: identity.name || 'No Name', remove_index: identity.id })
        return (<div className="p-grid">
            <div className='p-col-6 p-md-6 p-lg-6'>
                <Button onClick={() => { this.toggleRemoveModal(true, null) }} style={{ width: '100%' }} label="Remove Identity" className="p-button-raised p-button-danger" />

            </div>
            <div className='p-col-6 p-md-6 p-lg-6'>

                <Button onClick={() => { this.toggleNotificationModal(true, null) }} style={{ width: '100%' }} label="Identity Notifications" className="p-button-raised p-button-warning" />
            </div>
            <div className='p-col-12 p-md-12 p-lg-12'>
                <img style={{ maxHeight: '350px', width: '100%', objectFit: 'contain' }} src={identity.img} />
            </div>
        </div>)
    }

    thumbnailTemplate(item) {
        return <img src={item.img} alt={item.name} style={{ display: 'block', width: '50px', height: '50px' }} />;
    }

    caption(item) {
        return (
            <>
                <h2 className="p-mb-2">{item.name}</h2>
                {/* <p>{item.alt}</p> */}
            </>
        );
    }

    render() {
        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                <IdentityNotificationModal user_key={this.state.natification_key} monitor={this.state.notifications_monitor} name={this.state.notifications_name} show_modal={this.state.notifications_modal} hide_modal={this.toggleNotificationModal} />
                <RemoveIdentityModal name={this.state.remove_name} index={this.state.remove_index} show_modal={this.state.remove_modal} hide_modal={this.toggleRemoveModal} />
                <div className="card">
                    <div className="p-grid">
                        <div className='p-col-12 p-md-12 p-lg-12'>
                            <Galleria
                                onItemChange={(e) => console.log(e)}

                                value={this.props.images} responsiveOptions={this.responsiveOptions} numVisible={5}
                                item={this.itemTemplate} thumbnail={this.thumbnailTemplate}
                                caption={this.caption} style={{ maxWidth: '640px' }} activeIndex={this.props.activeIndex} onItemChange={(e) => this.props.onUpdateActiveIndex(e)} />
                        </div>
                        <div className='p-col-6 p-md-6 p-lg-6'>
                            <Button onClick={() => { this.toggleRemoveModal(true, null) }} style={{ width: '100%' }} label="Remove Identity" className="p-button-raised p-button-danger" />

                        </div>
                        <div className='p-col-6 p-md-6 p-lg-6'>

                            <Button onClick={() => { this.toggleNotificationModal(true, null) }} style={{ width: '100%' }} label="Identity Notifications" className="p-button-raised p-button-warning" />
                        </div>
                        <div className='p-col-12 p-md-12 p-lg-12'>
                            <Button style={{ width: '100%' }} label="New Identity" className="p-button-raised p-button-info" />

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}