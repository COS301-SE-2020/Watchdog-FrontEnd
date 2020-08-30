import React, { Component } from 'react';
import { propsDetectedImages, stateDetectedImages } from '../interfaces'
import { Button } from 'primereact/button'
import { ProgressBar } from 'primereact/progressbar'
import { Img } from 'react-image'
import AddDetected from './AddDetected'
import {getDetected} from '../api'
import { Toast } from 'primereact/toast'

const test_data = [
    {
        id: 1,
        key : '',
        img: "test.png"
    },
    {
        id: 2,
        key : '',
        img: "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    }
]

class DetectedImages extends Component<propsDetectedImages, stateDetectedImages> {
    constructor(props: propsDetectedImages) {
        super(props)

        this.state = {
            data: [],
            addDetectedModal : false,
            loading : true,
            toAddKey : ''
        }

        this.toggleAddModal = this.toggleAddModal.bind(this)
        this.getData = this.getData.bind(this)
    }

    toggleAddModal(val : boolean, reload : boolean|null){
        this.setState({addDetectedModal : val})
        if(reload){
            this.toast.show({ severity: 'success', summary: 'Success', detail: 'Added to Identities', life: 3000 })
            this.getData()
        }
    }
    async getData(){
        this.setState({loading : true, data : []})
        await getDetected((array_identities)=>{
            let new_data = array_identities.map((item, index)=>{
                return {
                    id : index +1,
                    key : item.key,
                    img : item.url
                }
            })
            
            this.setState({data : new_data})
        },()=>{
            this.toast.show({severity:'error', summary: 'Error', detail:'Unable to load identities', life: 3000});
        })
        this.setState({loading : false})

    }

    async componentDidMount(){
        
        this.getData()
        
    }

    render() {
        let detected_images = this.state.data.map((item, index) => {
            return (
                <div key={index + 1} className='p-col-12 p-md-6 p-lg-3'>
                    <div className="p-grid p-shadow-6" style={{paddingBottom: '5px'}}>
                        <div className=' p-col-12 '>
                            <div style={{ height: '200px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                <Img style={{ width: '100%', height: '200px', objectFit: 'contain' }} src={item.img} loader={
                                    <i className="pi pi-spin pi-spinner" style={{ 'fontSize': '5em' }}></i>} />
                                {/* <IdealImage
                                    placeholder ={{
                                        color: ''
                                      }}
                                    srcSet={[{ src: item.img, width: 3500 }]}
                                    alt="doggo"
                                    width={3500}
                                    height={2095}
                                /> */}
                                {/* <FittedImg src={item.img}  alt="Thing" fit="contain" position="0 50%" heigh='200' /> */}


                            </div>
                        </div>
                        <div className=' p-col-12 ' style={{textAlign : 'center'}}>
                            <Button onClick={()=>{
                                this.setState({toAddKey : item.key})
                                this.toggleAddModal(true, null)}}  label="Add To Identities" className="p-button-info" />

                        </div>
                    </div>




                </div>
            )

        })
        return (
            <div className="p-grid">
                <div style={{display : this.state.loading?'block':'none'}} className="p-field p-col-12 p-md-12"> <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar></div>
                <Toast ref={(el) => this.toast = el} />
                {detected_images}
                <AddDetected update_key={this.state.toAddKey} show_modal={this.state.addDetectedModal} hide_modal={this.toggleAddModal} />
            </div>

        );
    }
}

export default DetectedImages;