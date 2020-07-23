import React, { Component } from 'react'
import {Modal , Button, Grid, Row, Col, IconButton, Icon, Whisper, Tooltip} from 'rsuite'

class RemoveIdentityModal extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <Modal backdrop="static" show={this.props.toDisplay} onHide={this.props.toClose} size="xs">
            <Modal.Body>
              <Icon
                icon="remind"
                style={{
                  color: '#ffb300',
                  fontSize: 24
                }}
              />
              {'  '}
              You are about to remove {this.props.name} as a known identity. Are you sure you want to proceed?
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={()=>this.props.remove()} appearance="primary">
                Ok
              </Button>
              <Button onClick={this.props.toClose} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>  
        )
    }
}

export default RemoveIdentityModal