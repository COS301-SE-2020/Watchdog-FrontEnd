import React, { Component } from 'react'
import { propsIdentities, stateIdentities } from '../interfaces'
import { Img } from 'react-image'
import { Button } from 'primereact/button'
import { getIdentities } from '../api'
import { ProgressBar } from 'primereact/progressbar'
import RemoveIdentityModal from './RemoveIdentityModal'
import { Toast } from 'primereact/toast'

const test_users = [
    {
        id: 1,
        name: "Luqmaan Badat",
        img: "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4",
        monitor: '',
        img_key: ''
    },
    {
        id: 2,
        name: "Some Name 2",
        img: "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4",
        monitor: '',
        img_key: ''
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
            remove_index: null
        }

        this.getData = this.getData.bind(this)
        this.toggleRemoveModal = this.toggleRemoveModal.bind(this)
    }

    toggleRemoveModal(val: boolean, reload: boolean | null) {
        this.setState({ remove_modal: val })
        if (reload) {
            this.getData()
            this.toast.show({severity:'success', summary: 'Removed', detail:'Identity removed.', life: 3000})
        }
    }

    async getData() {
        this.setState({ loading: true, data: [] })

        await getIdentities((res) => {
            let users = res.data.data.identities.whitelist
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

        })

        this.setState({ loading: false })

    }

    componentDidMount() {
        this.getData()

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
                                <div className="p-text-center p-text-bold">{item.name||'No Name'}</div>
                        </div>


                        <div className=' p-col-12 ' style={{ textAlign: 'center' }}>
                            <div className="p-grid p-shadow-6">
                                <div className=' p-col-12 p-md-12 p-lg-12  '>
                                    <Button style={{ width: '100%' }} label="Notifications Settings" className="p-button-raised p-button-warning" />
                                </div>

                                <div className=' p-col-12 p-md-12 p-lg-12 '>
                                    <Button onClick={() => {
                                        this.setState({ remove_name: item.name ||'No Name', remove_index: item.id })
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
                <Toast ref={(el) => this.toast = el} />
                <RemoveIdentityModal name={this.state.remove_name} index={this.state.remove_index} show_modal={this.state.remove_modal} hide_modal={this.toggleRemoveModal} />
                <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>
                {identities}

            </div>
        );
    }
}

export default Identities;