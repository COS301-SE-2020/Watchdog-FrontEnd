import React, {Component, useEffect} from 'react';
import { render } from 'react-dom';
import {FlexboxGrid,Panel,IconButton, Grid, Row,Col, Icon, Button, Form, FormGroup} from 'rsuite'



class Download extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <FlexboxGrid style={{"marginTop":"10"}} justify="center">
                <FlexboxGrid.Item colspan={22}>
                    <Panel style={{alignContent:'center'}} header={<h3>Home Control Panel Downloads</h3>} >
                        <Form style={{textAlign: 'center'}} layout="inline">
                            <FormGroup >
                                <IconButton style={{width: '60px', height: '60px',right:'0'}}  icon={<Icon style={{fontSize: '36px'}} icon="windows" />} circle size="lg" ></IconButton>
                                
                            </FormGroup>
                            <FormGroup>
                                <IconButton style={{width: '60px', height: '60px',right:'0'}}  icon={<Icon style={{fontSize: '36px'}} icon="linux" />} circle size="lg" ></IconButton>
                            </FormGroup>
                            <FormGroup>
                                <IconButton style={{width: '60px', height: '60px',right:'0'}}  icon={<Icon style={{fontSize: '36px'}} icon="apple" />} circle size="lg" ></IconButton>
                            </FormGroup>
                        </Form>
                        
                    </Panel>
                    <Panel  header={<h3>App Downloads</h3>} >
                        <Form style={{textAlign: 'center'}} layout="inline">
                            <FormGroup>
                                <IconButton style={{width: '60px', height: '60px',right:'0'}}  icon={<Icon style={{fontSize: '36px'}} icon="android" />} circle  ></IconButton>
                            </FormGroup>
                            <FormGroup>
                                
                                <IconButton style={{width: '60px', height: '60px',right:'0'}} icon={<Icon icon="ios"  style={{fontSize: '36px'}}/>} circle  ></IconButton>
                            </FormGroup>
                        </Form>
                    </Panel>
            {/* <Grid >
                <Row style={{height:200}}>
                    <hr/>
                    <Col style={{textAlign: "center"}} lg={12}><h2>App Download</h2></Col>
                    <Col style={{textAlign: "center"}} lg={12}><h2>Home Control Panel Download</h2></Col>
                </Row>
                <hr/>
                <Row style={{height:125}}>
                    <Col style={{textAlign: "center"}} md={12}><Icon style={{fontSize:100}} icon={"android"}></Icon></Col>
                    <Col style={{textAlign: "center"}} md={12}><Icon style={{fontSize:100}} icon={"windows"}></Icon></Col>
                </Row>
                <Row >
                    <Col style={{textAlign: "center"}} md={12}><Button><h4>Android</h4></Button></Col>
                    <Col style={{textAlign: "center"}} md={12}><Button><h4>Windows</h4></Button></Col>
                </Row>
                <hr/>
                <Row style={{height:125}}>
                    <Col style={{textAlign: "center"}} md={12}><Icon style={{fontSize:100}} icon={"apple"}></Icon></Col>
                    <Col style={{textAlign: "center"}} md={12}><Icon style={{fontSize:100}} icon={"linux"}></Icon></Col>
                </Row>
                <Row >
                    <Col style={{textAlign: "center"}} md={12}><Button><h4>IOS</h4></Button></Col>
                    <Col style={{textAlign: "center"}} md={12}><Button><h4>Linux</h4></Button></Col>
                </Row>
            </Grid> */}
                </FlexboxGrid.Item>
            </FlexboxGrid>
        )
    }
}
export default Download