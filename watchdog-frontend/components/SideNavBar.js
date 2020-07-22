import React, {Component} from 'react'
import { Modal, Sidenav, Nav, Icon, Sidebar, IconButton, Button    } from 'rsuite'
import  { Auth } from 'aws-amplify'
import Router from 'next/router'




class SideNavBar extends Component {
    constructor(props) {
        super(props);
        //console.log(this.props)
        this.state = {
          expanded: false,
          activeKey: '1',
          activeKey: this.props.defaultKeyVal,
          logoutModal : false,
          show: false
        };
        this.handleToggle = this.handleToggle.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        
        // this.handleSelect = this.handleSelect.bind(this);
      }
      close() {
        this.setState({ show: false });
      }
      open() {
        this.setState({ show: true });
      }
      handleToggle() {
        this.setState({
          expanded: !this.state.expanded
        });
      }

      handleLogout(){
        this.open()
        
        

      }

      // handleSelect(eventKey) {
      //   this.setState({
      //     activeKey: eventKey
      //   });
      // }
      render() {
        const { expanded } = this.state;
        //this.setState({activeKey : this.props.key})
        
    
        return (
          <Sidebar
            style={{ display: 'flex', flexDirection: 'column'}}
            width={expanded ? 260 : 56}
            collapsible
            
          >
             <Modal backdrop="static" show={this.state.show} onHide={this.close} size="xs">
            <Modal.Body>
              <Icon
                icon="remind"
                style={{
                  color: '#ffb300',
                  fontSize: 24
                }}
              />
              {'  '}
              You are about to logout. Are you sure you want to proceed?
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={()=>{
                  this.props.handleChange(1)
                  Auth.signOut()
              }} appearance="primary">
                Ok
              </Button>
              <Button onClick={this.close} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
            <Sidenav
              expanded={expanded}
              
              activeKey={this.props.defaultKeyVal}
              // onSelect={this.handleSelect}
            >
              
              <Sidenav.Body>
                <Nav>
                <div  className="but"><Nav.Item onClick={this.handleToggle}  icon={<Icon icon="list" />}>
                    <h4>MENU</h4>
                  </Nav.Item></div>
                  <Nav.Item eventKey="1" onClick={() =>this.setState({activeKey : '1'}, this.props.handleChange(1))} icon={<Icon icon="home" />}>
                    Home
                  </Nav.Item>
                  <Nav.Item eventKey="2" onClick={() => this.setState({activeKey : '2'}, this.props.handleChange(2))}  icon={<Icon icon="video-camera" />}>
                    Live
                  </Nav.Item>
                  <Nav.Item eventKey="3" onClick={() => this.setState({activeKey : '3'}, this.props.handleChange(3))}  icon={<Icon icon="logo-video" />}>
                    Recordings
                  </Nav.Item>
                  <Nav.Item eventKey="4"onClick={() =>this.setState({activeKey : '4'}, this.props.handleChange(4))}  icon={<Icon icon="cog" />}>
                    Settings
                  </Nav.Item>
                  <Nav.Item  eventKey="5" onClick={this.handleLogout} icon={<Icon icon="sign-out" />}>
                    Logout
                    
                  </Nav.Item>
                  
                 
                </Nav>
                
              </Sidenav.Body>
              
            </Sidenav>
            </Sidebar>
          
        );
      }

}

export default SideNavBar
