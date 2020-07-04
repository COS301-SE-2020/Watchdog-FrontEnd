import React, {Component, useEffect} from 'react';
import { render } from 'react-dom';
import {FormGroup,Radio,RadioGroup, Grid, Row,Col, Icon, Button} from 'rsuite'



class Download extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <Grid >
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
            </Grid>
        )
    }
}
export default Download