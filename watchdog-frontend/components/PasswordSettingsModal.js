import React, { Component } from 'react'
import {Modal , Button, Grid, Row, Col, IconButton, Icon, Whisper, Tooltip} from 'rsuite'
import Pass from './ResetPasswordComponent'

class PasswordSettingsModal extends Component {
    render() {
        return (
            <Modal overflow size={'sm'} show={this.props.show} onHide={this.props.toggle} >
                <Modal.Header>
                    <Modal.Title><h5>Change Password</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Pass />
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

export default PasswordSettingsModal;