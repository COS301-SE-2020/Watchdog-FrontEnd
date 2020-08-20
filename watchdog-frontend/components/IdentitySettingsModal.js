import React, { Component } from 'react'
import IdentitySettings from './IdentitySettings'
import {Modal , Button, Grid, Row, Col, IconButton, Icon, Whisper, Tooltip} from 'rsuite'

class IdentitySettingsModal extends Component {
    render() {
        return (
            <Modal size={'lg'} show={this.props.show} onHide={this.props.toggle}>
                <Modal.Header>
                    <Modal.Title><h5>Identity Settings</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <IdentitySettings />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.toggle} appearance="primary">
                        Close
                    </Button>
    
                </Modal.Footer>
            </Modal>
        );
    }
}

export default IdentitySettingsModal;