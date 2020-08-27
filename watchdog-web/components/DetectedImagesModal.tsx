import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import {stateDetectedImagesModal, propsDetectedImagesModal} from '../interfaces'

class DetectedImagesModal extends Component<propsDetectedImagesModal, stateDetectedImagesModal> {
    render() {
        return (
            <div>
                <Dialog header="Identity Settings" visible={this.props.show_modal} 
                maximizable modal style={{ width: '80%' , maxWidth : '1700px'}} footer={<div>
                    <Button label="Close" icon="pi pi-times" onClick={()=>this.props.hide_modal(false)} className="p-button-text" />
                </div>} 
                
                onHide={()=>{this.props.hide_modal(false)}}>
                <p className="p-m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                 </Dialog>
            </div>
        );
    }
}

export default DetectedImagesModal;