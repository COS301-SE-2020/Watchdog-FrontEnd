import React, { Component } from 'react'
import {Modal , Button, Grid, Row, Col, IconButton, Icon, Whisper, Tooltip} from 'rsuite'
import NotificationView from './NotificationSettings'

class NotificationSettingsModal extends Component {
    render() {
        return (
            <Modal overflow size={'lg'} show={this.props.show} onHide={this.props.toggle} >
                <Modal.Header>
                    <Modal.Title><h5>Notification Settings</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NotificationView />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.toggle} appearance="primary">
                        Close
                    </Button>
    
                </Modal.Footer>
            </Modal>
        )
    }
}

export default NotificationSettingsModal;