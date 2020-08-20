import React, { Component } from 'react'
import HomePageLogs from './HomePageLogs'
import {Modal , Button, Grid, Row, Col, IconButton, Icon, Whisper, Tooltip} from 'rsuite'
class LogsModal extends Component {
    render() {
        return (
            <Modal size={'lg'} show={this.props.show} onHide={this.props.toggle}>
                <Modal.Header>
                    <Modal.Title><h5>Camera Logs</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HomePageLogs />
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

export default LogsModal