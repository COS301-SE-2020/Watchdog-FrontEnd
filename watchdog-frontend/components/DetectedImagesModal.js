import React, { Component } from 'react'
import {Modal , Button, Grid, Row, Col, IconButton, Icon, Whisper, Tooltip} from 'rsuite'
import DetectedImages from './DetectedImages'

class DetectedImagesModal extends Component {
    render() {
        return (
            <Modal overflow size={'lg'} show={this.props.show} onHide={this.props.toggle} >
                <Modal.Header>
                    <Modal.Title><h5>Detected Images</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DetectedImages />
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

export default DetectedImagesModal;