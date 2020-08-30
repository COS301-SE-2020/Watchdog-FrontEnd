import React, { Component } from 'react'
import { propsIdentities, stateIdentities } from '../interfaces'
import { Img } from 'react-image'
import { Button } from 'primereact/button'
import { getIdentities } from '../api'
import { ProgressBar } from 'primereact/progressbar'

const test_users = [
    {
        id: 1,
        name: "Luqmaan Badat",
        img: "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4",
        monitor : '',
        img_key : ''
    },
    {
        id: 2,
        name: "Some Name 2",
        img: "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4",
        monitor : '',
        img_key : ''
    }
]

class Identities extends Component<propsIdentities, stateIdentities> {
    constructor(props: propsIdentities) {
        super(props)
        this.state = {
            data: [],
            loading: true
        }

        this.getData = this.getData.bind(this)
    }

    async getData() {
        this.setState({ loading: true })

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

            this.setState({data : format})

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

                        <div className=' p-col-12 ' style={{ textAlign: 'center' }}>
                            <div className="p-grid p-shadow-6">
                                <div className=' p-col-12 p-md-12 p-lg-12  '>
                                    <Button style={{ width: '100%' }} label="Notifications Settings" className="p-button-raised p-button-warning" />
                                </div>

                                <div className=' p-col-12 p-md-12 p-lg-12 '>
                                    <Button style={{ width: '100%' }} label="Remove Identity" className="p-button-raised p-button-danger" />
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
                {identities}

            </div>
        );
    }
}

export default Identities;