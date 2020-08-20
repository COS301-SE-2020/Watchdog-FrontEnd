import React, { Component } from 'react'
import {Modal , Button, Grid, Row, Col, IconButton, Icon, Whisper, Tooltip} from 'rsuite'
import { Auth, Hub } from 'aws-amplify'

class LogoutModal extends Component {
    
    render() {
        return (
            <Modal backdrop="static" show={this.props.show} onHide={this.props.close} size="xs">
                <Modal.Body>
                    <Icon
                        icon="remind"
                        style={{
                            color: '#ffb300',
                            fontSize: 24
                        }}
                    />
                    {'  '}
              You are about to logout. Are you sure you want to proceed?
            </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        
                        Auth.signOut()
                    }} appearance="primary">
                        Ok
              </Button>
                    <Button onClick={this.props.close} appearance="subtle">
                        Cancel
              </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default LogoutModal;