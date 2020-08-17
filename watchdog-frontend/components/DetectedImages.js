import React, { Component } from 'react'
import {Panel, Avatar, Grid, InputGroup  , Input , Icon, Whisper, Tooltip, FlexboxGrid, Alert, Modal, Button, Row, Col} from 'rsuite'
import Loading from './Loading'

const styles_input = {
    width: 350,
    marginBottom: 10
}

const test_data = [
    {
        id : 1,
        
        img : "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    },
    {
        id : 2,
        
        img : "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    },
    {
        id : 3,
        
        img : "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    }
]

class DetectedImages extends Component {
    constructor(){
        super()
        this.state = {
            data : test_data || [],
            loading : true,
            show : false,
            name : ''
        }

        this.close = this.close.bind(this)
    }
    close() {
        this.setState({
          show: false
        })
      }

    async componentDidMount(){
        this.setState({loading : true})
        
        this.setState({loading : false})

    }
    render() {
        let img_data = this.state.data.map((item, index)=>{
            return(
              
                    <Col key={item.id} xs={6}>
                        <img style={{width: '100%'}} src={item.img} />

                    </Col>
                    

                   
            )
            
            
        })
        if(this.state.loading===true){
            return(<Loading />)
        }
        return (
            <FlexboxGrid style={{"marginTop":"10"}} justify="center">
                <FlexboxGrid.Item colspan={22}>
                    <Panel  header={<h3>Detected Images</h3>} >
                        <Panel shaded>
                            <Grid fluid>
                            <Row  fluid>
                                {img_data}
                             </Row>
                                <Button onClick={()=>this.setState({show:true})}>Test</Button>
                            </Grid>  
                        </Panel>

                    </Panel>

                </FlexboxGrid.Item>

                <Modal size='xs' show={this.state.show} onHide={this.close}>
                    <Modal.Header>
                        <Modal.Title>Add To Identities</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <InputGroup style={styles_input} >
                            <InputGroup.Addon>
                                <Icon icon="avatar" />
                            </InputGroup.Addon>
                            <Input value={this.state.name} onChange={(val)=>this.setState({name : val})} placeholder="Full Name" />
                        </InputGroup>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close} appearance="primary">
                        Ok
                        </Button>
                        <Button onClick={this.close} appearance="subtle">
                        Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </FlexboxGrid>
        )
    }
}

export default DetectedImages