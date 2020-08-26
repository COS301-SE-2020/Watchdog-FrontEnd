import React, { Component } from 'react';
import { Navbar, Button, Alignment, Popover, Menu, MenuItem, MenuDivider, Position, Switch } from "@blueprintjs/core"
import { Container, Header, Content, Footer } from 'rsuite'
import { appState, appProps } from '../interfaces/index'
import DashboardTab from './DashboardTab'
import RecordingsTab from './RecordingsTab'
class App extends Component<appProps, appState> {
    constructor(props: appProps) {
        super(props)
        this.state = {
            currentScreen: 1,
            darkMode: true
        }
    }
    render() {
        const SystemSettings = (
            <Menu>
                <MenuItem icon="mugshot" text="Identity Settings" />
                <MenuItem icon="blocked-person" text="Detected Images" />
                <MenuItem icon="feed" text="Notification Settings" />
                <MenuDivider />
                <MenuItem icon="issue" text="System Logs" />
                <MenuItem icon="download" text="Downloads" />
                <MenuDivider />
                <Switch checked={this.state.darkMode} label="Dark Mode" onChange={() => {
                    this.setState({ darkMode: !this.state.darkMode })
                    this.props.toggleDark()
                }} />
            </Menu>

        )

        const AccountSettings = (
            <Menu>
                <MenuItem icon="person" text="Account Information" />
                <MenuItem icon="key" text="Password Settings" />
                <MenuItem icon="log-out" text="Logout" />

            </Menu>
        )
        return (

            <Container  >
                <Header>
                    <Navbar>
                        <Navbar.Group align={Alignment.LEFT}>
                            <Navbar.Heading><img style={{ height: '45px' }} src='logo1.png' /></Navbar.Heading>
                            <Navbar.Divider />
                            <Button onClick={() => this.setState({ currentScreen: 1 })} className="bp3-minimal" icon="home" text="Dashboard" />
                            <Button onClick={() => this.setState({ currentScreen: 2 })} className="bp3-minimal" icon="camera" text="Recordings" />
                            <Popover content={SystemSettings} position={Position.BOTTOM_RIGHT}>
                                <Button className="bp3-minimal" icon="cog" text="System Settings" />
                            </Popover>
                        </Navbar.Group>
                        <Navbar.Group align={Alignment.RIGHT}>
                            <Popover content={AccountSettings} position={Position.BOTTOM_RIGHT}>
                                <Button className="bp3-minimal" icon="user" text="Account Settings" />
                            </Popover>
                        </Navbar.Group>
                    </Navbar>
                </Header>
                <Content style={{maxWidth: "1700px", margin: 'auto', height:'90vh'}}>{this.state.currentScreen === 1 ?<DashboardTab /> : <RecordingsTab />}</Content>


            </Container>

        );
    }
}

export default App;