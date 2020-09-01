import React, { Component } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { stateIdentitiesModal, propsIdentitiesModal } from '../interfaces'
import Identities from './Identities'

class IdentitiesModal extends Component<propsIdentitiesModal, stateIdentitiesModal> {
    render() {
        return (
            <div>
                <Dialog header="Identity Settings" visible={this.props.show_modal}
                    maximizable modal style={{ width: '80%', maxWidth: '1700px' }} footer={<div>
                        <Button label="Close" icon="pi pi-times" onClick={() => this.props.hide_modal(false)} className="p-button-text" />
                    </div>}

                    onHide={() => { this.props.hide_modal(false) }}>

                    <div style={{ height: '65vh' }}>
                        <Identities />
                    </div>

                </Dialog>

            </div>
        );
    }
}

export default IdentitiesModal;