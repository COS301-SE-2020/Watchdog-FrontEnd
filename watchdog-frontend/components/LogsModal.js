import React, { Component } from 'react'
import HomePageLogs from './HomePageLogs'
import {Modal , Button, Grid, Row, Col, IconButton, Icon, Whisper, Tooltip} from 'rsuite'
class LogsModal extends Component {
    render() {
        return (
            <Modal overflow={true} size={'lg'} show={this.props.show} onHide={this.props.toggle}>
                <Modal.Header>
                    <Modal.Title><h3>Camera Logs</h3></Modal.Title>
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