
import NavButton from "./NavButton";
import React, {Component} from 'react';

class NavBar extends Component{
  constructor(){
    super()
  }
  render (){
    return(
      <div className="NavBar">
  <div>
    {this.props.navButtons.map(button => (
      <NavButton
        key={button.path}
        path={button.path}
        label={button.label}
        icon={button.icon}
      />
    ))}
  </div>
  <div className="Username"><h4>Username</h4></div>
  </div>
  )

  }
}
export default NavBar;