import React, { Component } from 'react'
import { propsAddIdentityModal, stateAddIdentityModal } from "../interfaces"
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Steps } from 'primereact/steps'
import * as faceapi from 'face-api.js'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { ProgressBar } from 'primereact/progressbar'
import { addIdentity } from "../api";



const steps = [
    { label: 'Name' },
    { label: 'Image' }
];

const styles = {
    width: 300,
    height: 300
};

class AddIdentityModal extends Component<propsAddIdentityModal, stateAddIdentityModal> {
    constructor(props: propsAddIdentityModal) {
        super(props)
        this.state = {
            loading: false,
            active_page: 0,
            name: '',
            fileInfo: null,
            fileName : ''
        }
        this.previewFile = this.previewFile.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
    }

    previewFile(file, callback) {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    }

    async handleAdd(){
        this.setState({loading : true})

        const MODEL_URL = './models/'
        await faceapi.loadTinyFaceDetectorModel(MODEL_URL)    
        await faceapi.loadFaceLandmarkModel(MODEL_URL)   
        
        let detectionWithLandmarks = await faceapi.detectSingleFace('img_file', new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
        if(detectionWithLandmarks == null){

                      
            this.toast.show({ severity: 'error', summary: 'Error', detail: 'Unable to detect face in the image you uploaded', life: 3000 })
            this.setState({loading : false})
            return

        }

        await addIdentity(this.state.name, this.state.fileName, this.state.fileInfo, ()=>{
            this.setState({
                loading: false,
                active_page: 0,
                name: '',
                fileInfo: null,
                fileName : ''
            })
            this.props.hide_modal(false, true)

        }, ()=>{
            this.toast.show({ severity: 'error', summary: 'Error', detail: 'Unable to add identity. Please try again', life: 3000 })
            this.setState({loading : false})
            return

        })

    }





    handleClose() {
        this.setState({
            loading: false,
            active_page: 0,
            name: '',
            fileInfo: null,
            fileName : ''
        })
        this.props.hide_modal(false)
    }

    render() {
        return (
            <Dialog header={'Add Identity'} position='top' visible={this.props.show_modal}
                modal style={{ width: '450px' }} footer={<div>
                    <Button disabled={this.state.loading} label="Close" icon="pi pi-times" onClick={() => this.handleClose()} className="p-button-text" />
                    <Button disabled={this.state.loading || this.state.name.length <= 0 || this.state.fileInfo === null} label="ADD" icon="pi pi-check" onClick={() => this.handleAdd()} autoFocus />
                </div>} onHide={() => { this.handleClose() }}>
                <Toast  ref={(el) => this.toast = el} />
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-12">
                        <div className="card" style={{ marginTop: '5px' }}>
                            <Steps activeIndex={this.state.active_page} model={steps} />
                        </div>
                    </div>
                    

                    {this.state.active_page == 0 ?

                        <div className="p-field p-col-12 p-md-12">
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12 p-md-12">
                                    <div className="card" style={{ height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                        <label htmlFor="phone">Identity Name:</label>
                                        <span className="p-input-icon-left">
                                            <i className="pi pi-user-plus" />
                                            <InputText disabled={this.state.loading} value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                                        </span>
                                    </div>
                                </div>
                                <div className="p-field p-col-12 p-md-12" style={{ alignItems: 'Right', justifyContent: 'Right', display: 'flex' }}>

                                    <Button iconPos='right' className="p-button-success p-button-text" style={{ width: '100px', display: !this.state.loading ? 'block' : 'none' }} disabled={this.state.name.length > 0 ? false : true} label="Next" icon="pi pi-arrow-right" onClick={() => this.setState({ active_page: 1 })} autoFocus />


                                </div>
                            </div>
                        </div> :
                        <div className="p-field p-col-12 p-md-12">
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12 p-md-12">
                                    <Button disabled={this.state.loading} label="Select Image" onClick={() => this.inputFile.click()} />
                                    <input
                                        type="file"
                                        ref={(el) => this.inputFile = el}
                                        onChange={(el) => {
                                            this.setState({fileName : el.target.files[0].name})
                                            this.previewFile(el.target.files[0], value => {
                                                
                                                this.setState({ fileInfo: value })

                                                //setFileInfo(value);
                                            });


                                        }}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                    />


                                </div>

                                <div style={{ display: this.state.fileInfo === null ? 'none' : 'block' }} className="p-field p-col-12 p-md-12">
                                    <div className="card" style={{ height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                        <img style={styles} id='img_file' src={this.state.fileInfo} width="100%" height="100%" />
                                    </div>
                                </div>
                                <div className="p-field p-col-12 p-md-12">
                                    <div className="card" style={{ height: '100%', alignItems: 'Right', justifyContent: 'Right', display: 'flex' }}>
                                        <Button className="p-button-warning p-button-text" style={{ width: '100px', display: !this.state.loading ? 'block' : 'none' }} label="Back" icon="pi pi- pi-arrow-left" onClick={() => this.setState({ active_page: 0 })} autoFocus />
                                    </div>

                                </div>
                            </div>
                        </div>}
                        <div style={{ display: this.state.loading ? 'block' : 'none' }} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>
                </div>
            </Dialog>
        );
    }
}

export default AddIdentityModal;