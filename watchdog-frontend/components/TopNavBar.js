import React, { Component } from 'react'
import { Navbar, Sidenav, Nav, Icon, Dropdown, IconButton, Button    } from 'rsuite'
class TopNavBar extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    {/* <a href="#" className="navbar-brand logo">RSUITE</a> */}
                    <img style={{height: '50px'}} src = 'logo1.png'/>
                </Navbar.Header>
                <Navbar.Body >
                    <Nav  >
                        <Nav.Item onClick={()=>this.props.handleChange(1)}> <h6>HOME</h6></Nav.Item>
                        <Nav.Item onClick={()=>this.props.handleChange(3)}><h6>Recordings</h6></Nav.Item>
                        <Nav.Item onClick={()=>this.props.handleChange(5)} ><h6>Logs</h6></Nav.Item>
                        <Nav.Item onClick={()=>this.props.handleChange(6)}><h6>Downloads</h6></Nav.Item>
                        <Dropdown trigger={['click', 'hover']} title={<h6>Settings</h6>}>
                            <Dropdown.Item onClick={()=>this.props.handleChange(7)}>Identity Settings</Dropdown.Item>
                            <Dropdown.Item>Detected Images</Dropdown.Item>
                            <Dropdown.Item>Notification Settings</Dropdown.Item>
                            
                        </Dropdown>
                        
                    </Nav>
                    <Nav pullRight>
                        {/* <Nav.Item icon={<Icon icon="cog" />} >Account Infomations</Nav.Item> */}
                        <Dropdown trigger={['click', 'hover']} title={<h6>Account</h6>} placement="bottomEnd">
                            <Dropdown.Item>Account Information</Dropdown.Item>
                            <Dropdown.Item>Password Settings</Dropdown.Item>
                            
                        </Dropdown>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        )
    }
}

export default TopNavBar