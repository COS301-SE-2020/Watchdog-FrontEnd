import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import {stateDetectedImagesModal, propsDetectedImagesModal} from '../interfaces'
import DetectedImages from './DetectedImages'


class DetectedImagesModal extends Component<propsDetectedImagesModal, stateDetectedImagesModal> {
    render() {
        return (
            
                <Dialog header="Identity Settings" visible={this.props.show_modal} 
                maximizable modal style={{ width: '80%' , maxWidth : '1700px'}} footer={<div>
                    <Button label="Close" icon="pi pi-times" onClick={()=>this.props.hide_modal(false)} className="p-button-text" />
                </div>} 
                
                onHide={()=>{this.props.hide_modal(false)}}>
                    <div style={{height: '65vh'}}>
                         <DetectedImages />
                    </div>
                   
                 </Dialog>
            
        );
    }
}

export default DetectedImagesModal;