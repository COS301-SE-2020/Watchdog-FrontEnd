import React, { Component } from 'react'
import {Modal , Button, Grid, Row, Col, IconButton, Icon, Whisper, Tooltip} from 'rsuite'
import Download from './DownloadComponent'

class DownloadsModal extends Component {
    render() {
        return (
            <Modal size={'sm'} show={this.props.show} onHide={this.props.toggle}>
                <Modal.Header>
                    <Modal.Title><h5>Downloads</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Download />
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

export default DownloadsModal;