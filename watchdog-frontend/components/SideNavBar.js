import React, {Component} from 'react'
import { Toggle, Sidenav, Nav, Icon, Sidebar, IconButton   } from 'rsuite'
import  { Auth } from 'aws-amplify'
import Router from 'next/router'



class SideNavBar extends Component {
    constructor(props) {
        super(props);
        //console.log(this.props)
        this.state = {
          expanded: false,
          activeKey: this.props.MenuNumber
        };
        this.handleToggle = this.handleToggle.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        
        // this.handleSelect = this.handleSelect.bind(this);
      }
      handleToggle() {
        this.setState({
          expanded: !this.state.expanded
        });
      }

      handleLogout(){
        Auth.signOut();

      }

      // handleSelect(eventKey) {
      //   this.setState({
      //     activeKey: eventKey
      //   });
      // }
      render() {
        const { expanded } = this.state;
        //this.setState({activeKey : this.props.key})
        console.log(this.props.children)
    
        return (
          <Sidebar
            style={{ display: 'flex', flexDirection: 'column' }}
            width={expanded ? 260 : 56}
            collapsible
          >
            <Sidenav
              expanded={expanded}
              activeKey={this.state.activeKey}
              // onSelect={this.handleSelect}
            >
              
              <Sidenav.Body>
                <Nav>
                <div className="but"><Nav.Item onClick={this.handleToggle}  icon={<Icon icon="list" />}>
                    <h4>MENU</h4>
                  </Nav.Item></div>
                  <Nav.Item eventKey="1" onClick={() => Router.push('/Home')} icon={<Icon icon="home" />}>
                    Home
                  </Nav.Item>
                  <Nav.Item eventKey="2" onClick={() => Router.push('/liveVideo')}  icon={<Icon icon="video-camera" />}>
                    Live
                  </Nav.Item>
                  <Nav.Item eventKey="3" onClick={() => Router.push('/SavedVideo')}  icon={<Icon icon="logo-video" />}>
                    Recordings
                  </Nav.Item>
                  <Nav.Item eventKey="4"onClick={() => Router.push('/Profile')}  icon={<Icon icon="profile" />}>
                    Profile
                  </Nav.Item>
                  <Nav.Item eventKey="5" onClick={this.handleLogout} icon={<Icon icon="sign-out" />}>
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