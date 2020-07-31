import React, { Component } from 'react'
import {Modal , Button, Input, FormGroup, Col, InputGroup, Icon, Form, Uploader, Alert, Loader} from 'rsuite'

import {addIdentity} from '../api/api'
const styles = {
    width: 150,
    height: 150
  };

const styles_input = {
width: 300,
marginBottom: 10
};

class AddIdentityModal extends Component{
    constructor(props){
        super(props)
        this.state ={
            uploading : false,
            setUploading : false,
            fileInfo : null,
            setFileInfo : null,
            name : "",
            url : null,
            fname : null,
            data: null,
            file_to_upload : null,
            loading : false
        }

        this.previewFile = this.previewFile.bind(this)
        this.addIdentity = this.addIdentity.bind(this)
        this.setUrl = this.setUrl.bind(this)
    }

    previewFile(file, callback) {
        const reader = new FileReader();
        reader.onloadend = () => {
          callback(reader.result);
        };
        reader.readAsDataURL(file);
      }
    
    async addIdentity(){

        //check if the name field is filled in
        if(this.state.name===null||this.state.name===''){
            Alert.error('Please enter a name.',3000)
            return
        }

        let filter_list = this.props.current_list.filter((item)=>{
            return item.name.toLowerCase()===this.state.name.toLowerCase()})
        //console.log(filter_list.length)
        if(filter_list.length >0){
            Alert.error('An identity with the name '+ this.state.name+' already exists',3000)
            return
        }
        if(this.state.fileInfo===null){
            Alert.error('Please select a file.',3000)
            return
        }

        //check if there is a picture 
        await this.setState({loading : true})
        await addIdentity(this.state.name, this.state.fname, this.setUrl, this.state.file_to_upload, this.props.updatelist, ()=>{
            let newUser = {
                name : this.state.name,
                img: this.state.fileInfo
            }
    
            this.props.local_list_add(newUser)
            Alert.success('Identity Added')
        }, ()=>{Alert.error("Fail to add to whitelist", 3000)} )
        //await this.uploader.start()
        
        this.setState({fileInfo: null, name : null, file_to_upload: null, loading: false},()=>{ this.props.toClose()})

    }

    setUrl(Upload_url, upload_data){
        //console.log(upload_data)
        this.setState({url : Upload_url, data: upload_data })
    }



    render(){
        return(
            <Modal size={"md"} show={this.props.toDisplay} onHide={()=>{
                this.setState({fileInfo: null, name : null})
                this.props.toClose()}}>
                <Modal.Header>
                <Modal.Title>Add an Identity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.loading? (
                     <div style={{ textAlign: 'center' }}>
                        <Loader size="md" />
                        </div>
                     
                    ):(
                    <Form layout="inline">
                    <FormGroup>
                        <Uploader
                            autoUpload={false}
                            fileListVisible={false}
                            listType="picture"
                            action={this.state.url}
                            //headers={this.state.data}
                            data={this.state.data}
                            ref={ref => {
                                this.uploader = ref;
                              }}
                            onChange={(file) => {
                                //console.log(file[0])
                                
                                this.setState({setUploading : true, file_to_upload: file[0]})
                                this.previewFile(file[0].blobFile, value => {
                                  //console.log(value)
                                  this.setState({fileInfo : value, fname: file[0].name})
                            
                                  //setFileInfo(value);
                                });
                              }}

                              onSuccess={(response, file) => {
                                //setUploading(false);
                                Alert.success('Uploaded successfully');
                                console.log(response);
                              }}
                              onError={(err, file) => {
                                //setFileInfo(null);
                                //setUploading(false);
                                console.log(err)
                                Alert.error('Upload failed');
                              }}
                            
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
                            <Input value={this.state.name} onChange={(val)=>this.setState({name : val})} placeholder="Full Name" />
                        </InputGroup>
                        </FormGroup>
                    </Form>    
                    )}
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={this.addIdentity} appearance="primary">
                    Add
                </Button>
                <Button onClick={()=>{
                            this.setState({fileInfo: null, name : null})
                            this.props.toClose()}} appearance="subtle">
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default AddIdentityModal