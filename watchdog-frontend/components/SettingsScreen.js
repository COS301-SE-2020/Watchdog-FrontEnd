import React, { Component } from 'react'
import {Container, Icon , Sidebar, Sidenav, Nav, Header, Content} from 'rsuite'
import IdentitySettings from './IdentitySettings'
import Notify from './NotificationComponent'
import Pass from './ResetPasswordComponent'
import Download from './DownloadComponent'

class SettingsScreen extends Component{
    constructor(){
        super()
        this.state ={
            activeKey : '1',
            
        }
    }

    render(){
        return(
            <Container>
                <Sidebar>
                    <Sidenav appearance={'subtle'} activeKey={this.state.activeKey}>
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item eventKey="1" onClick={() =>this.setState({activeKey : '1'})} icon={<Icon icon="group" />}>
                                    Identity Settings
                                </Nav.Item>
                                <Nav.Item eventKey="2" onClick={() =>this.setState({activeKey : '2'})} icon={<Icon icon="bell" />}>
                                    Notification Settings
                                </Nav.Item>
                                <Nav.Item eventKey="3" onClick={() =>this.setState({activeKey : '3'})} icon={<Icon icon="key" />}>
                                   Password Settings
                                </Nav.Item>
                                <Nav.Item eventKey="4" onClick={() =>this.setState({activeKey : '4'})} icon={<Icon icon="download" />}>
                                   Downloads
                                </Nav.Item>
                                
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>

                </Sidebar>

                <Container>
                    
                    <Content>
                        {this.state.activeKey==='1'&&<IdentitySettings/>}
                        {this.state.activeKey==='2'&&<Notify/>}
                        {this.state.activeKey==='3'&&<Pass/>}
                        {this.state.activeKey==='4'&&<Download/>}

                    </Content>
            
                </Container>

            </Container>
        )

    }

}

export default SettingsScreen