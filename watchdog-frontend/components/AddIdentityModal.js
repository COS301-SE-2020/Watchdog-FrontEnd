import React, { Component } from 'react'
import {Modal , Button, Input, FormGroup, Col, InputGroup, Icon, Form, Uploader} from 'rsuite'
const styles = {
    width: 150,
    height: 150
  };

const styles_input = {
width: 300,
marginBottom: 10
};

class AddIdentityModal extends Component{
    constructor(){
        super()
        this.state ={
            uploading : false,
            setUploading : false,
            fileInfo : null,
            setFileInfo : null
        }

        this.previewFile = this.previewFile.bind(this)
    }

    previewFile(file, callback) {
        const reader = new FileReader();
        reader.onloadend = () => {
          callback(reader.result);
        };
        reader.readAsDataURL(file);
      }

    render(){
        return(
            <Modal size={"md"} show={this.props.toDisplay} onHide={this.props.toClose}>
                <Modal.Header>
                <Modal.Title>Add an Identity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form layout="inline">
                    <FormGroup>
                        <Uploader
                            fileListVisible={false}
                            listType="picture"
                            action=""
                            onUpload={file => {
                                this.setState({setUploading : true})
                                this.previewFile(file.blobFile, value => {
                                  console.log(value)
                                  this.setState({fileInfo : value})
                            
                                  //setFileInfo(value);
                                });
                              }}

                            //   onSuccess={(response, file) => {
                            //     //setUploading(false);
                            //     Alert.success('Uploaded successfully');
                            //     console.log(response);
                            //   }}
                            //   onError={() => {
                            //     //setFileInfo(null);
                            //     //setUploading(false);
                            //     Alert.error('Upload failed');
                            //   }}
                            
                        >
                        <button style={styles}>
                            {this.state.uploading && <Loader backdrop center />}
                            {this.state.fileInfo ? (
                            <img src={this.state.fileInfo} width="100%" height="100%" />
                            ) : (
                            <Icon icon="avatar" size="5x" />
                            )}
                        </button>
                        </Uploader>
                        </FormGroup>
                        <FormGroup>
                        <InputGroup style={styles_input} >
                            <InputGroup.Addon>
                                <Icon icon="avatar" />
                            </InputGroup.Addon>
                            <Input  placeholder="Full Name" />
                        </InputGroup>
                        </FormGroup>
                    </Form>    
                
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={this.props.toClose} appearance="primary">
                    Add
                </Button>
                <Button onClick={this.props.toClose} appearance="subtle">
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default AddIdentityModal