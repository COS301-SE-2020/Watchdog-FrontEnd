import React, { Component } from 'react';
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { propsProfileAnalyticModals, stateProfileAnalyticModals } from '../interfaces'
import { Galleria } from 'primereact/galleria'

const responsiveOptions = [
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
]

class ProfileAnalyticModals extends Component<propsProfileAnalyticModals, stateProfileAnalyticModals> {
    constructor(props: any) {
        super(props)
        this.handleClose = this.handleClose.bind(this)
        this.itemTemplate = this.itemTemplate.bind(this)
        this.thumbnailTemplate = this.thumbnailTemplate.bind(this)
    }

    itemTemplate(item) {
        // custom item content
        console.log(item.link)
        return <img src={item.link} alt={item.alt} style={{ maxHeight: '350px', width: '100%', objectFit: 'contain' }} />
    }

    thumbnailTemplate(item) {
        // custom thumbnail content
        return <img src={item.link} alt={item.alt} style={{ display: 'block', width: '50px', height: '50px' }} />
    }

    handleClose() {
        this.props.hide_modal(false)

    }
    render() {
        return (
            <Dialog header={this.props.name} position='top' visible={this.props.show_modal}
                modal style={{ width: '450px' }} footer={<div>
                    <Button label="Close" icon="pi pi-times" onClick={() => this.handleClose()} className="p-button-text" />

                </div>} onHide={() => { this.handleClose() }}>

                <Galleria value={this.props.img_list} item={this.itemTemplate} thumbnail={this.thumbnailTemplate}
                    ></Galleria>


            </Dialog>

        )
    }
}
export default ProfileAnalyticModals;