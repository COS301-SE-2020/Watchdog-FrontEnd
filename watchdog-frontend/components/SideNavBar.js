import React, {Component} from 'react'
import { Toggle, Sidenav, Nav, Icon, Dropdown, IconButton   } from 'rsuite'


class SideNavBar extends Component {
    constructor() {
        super();
        this.state = {
          expanded: false,
          // activeKey: '1'
        };
        this.handleToggle = this.handleToggle.bind(this);
        // this.handleSelect = this.handleSelect.bind(this);
      }
      handleToggle() {
        this.setState({
          expanded: !this.state.expanded
        });
      }
      // handleSelect(eventKey) {
      //   this.setState({
      //     activeKey: eventKey
      //   });
      // }
      render() {
        const { expanded } = this.state;
    
        return (
          <div style={{ width: 250 }}>
            <IconButton size="lg" onClick={this.handleToggle} checked={expanded}color="black" icon={<Icon icon="list" />}/>
            <hr />
            <Sidenav
              expanded={expanded}
              activeKey={this.state.activeKey}
              // onSelect={this.handleSelect}
            >
              <Sidenav.Body>
                <Nav>
                  <Nav.Item eventKey="1" href='/Home' icon={<Icon icon="home" />}>
                    Home
                  </Nav.Item>
                  <Nav.Item eventKey="2" href='/liveVideo' icon={<Icon icon="video-camera" />}>
                    View Live Video
                  </Nav.Item>
                  <Nav.Item eventKey="3" href='/SavedVideo' icon={<Icon icon="logo-video" />}>
                    View Saved Video
                  </Nav.Item>
                  <Nav.Item eventKey="4" href='/Profile' icon={<Icon icon="profile" />}>
                    Profile
                  </Nav.Item>
                  <Nav.Item eventKey="5" href='/index' icon={<Icon icon="sign-out" />}>
                    Log Out
                  </Nav.Item>
                 
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </div>
        );
      }

}

export default SideNavBar
