import React, { Component } from 'react';
import { Modal, Button, InputGroup, Input, RadioGroup, Radio, Icon, Whisper, Tooltip, FlexboxGrid, Alert } from 'rsuite'
const styles_input = {
    width: 350,
    marginBottom: 10
}
const styles = {
    radioGroupLabel: {
        padding: '8px 8px 8px 10px',
        display: 'inline-block',
        verticalAlign: 'middle'
    },

    radioBtn: {
        paddingRight : '8px',
        verticalAlign: 'middle'
    }
}
class IdentityNotification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }

    }

    render() {
        return (
            <Modal size={'xs'} show={this.props.show} onHide={() => {
                this.setState({ message: '' })
                this.props.toggle()
            }}>
                <Modal.Header>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup style={styles_input} >
                        <InputGroup.Addon>
                            <Icon icon="avatar" />
                        </InputGroup.Addon>
                        <Input value={this.state.message} onChange={(val) => this.setState({ message: val })} placeholder="Notification Message" />
                    </InputGroup>

                    <RadioGroup style={{width: '350px'}} name="radioList" inline appearance="picker" defaultValue="B">
                        <span style={styles.radioGroupLabel}>Notifications Settings: </span>
                        <Radio style={styles.radioBtn} value="A">Enbaled</Radio>
                        <Radio style={styles.radioBtn} value="B">Disabled</Radio>
                    </RadioGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close} appearance="primary">
                        Update
            </Button>
                    <Button onClick={() => {
                        this.setState({ message: '' })
                        this.props.toggle()
                    }} appearance="subtle">
                        Cancel
            </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default IdentityNotification;