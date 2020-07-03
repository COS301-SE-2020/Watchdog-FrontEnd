import React, { Component } from 'react'
import {Container, Icon , Sidebar, Sidenav, Nav, Header, Content} from 'rsuite'

class SettingsScreen extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <Container>
                <Sidebar>
                    <Sidenav appearance={'subtle'} activeKey="1">
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item eventKey="1" icon={<Icon icon="group" />}>
                                    Identity Settings
                                </Nav.Item>
                                <Nav.Item eventKey="2" icon={<Icon icon="bell" />}>
                                    Notification Settings
                                </Nav.Item>
                                <Nav.Item eventKey="2" icon={<Icon icon="key" />}>
                                   Password Settings
                                </Nav.Item>
                                
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>

                </Sidebar>

                <Container>
                    <Header>
                        <h2>Page Title</h2>
                    </Header>
                    <Content></Content>
            
                </Container>

            </Container>
        )

    }

}

export default SettingsScreen