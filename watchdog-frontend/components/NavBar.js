import NavButton from "./NavButton";
import React, {Component} from 'react';

const styling = {
  "NavButton": {
    "display": "block",
    "flexDirection": "column",
    "justifyContent": "space-around",
    "alignItems": "center",
    "width": "20%",
    "background": "white",
    "float": "left",
    "height": "100%",
    "cursor": "pointer"
  },
  "NavButton_Icon": {
    "fontSize": "20px",
    "alignItems": "center",
    "background": "white"
  },
  "NavButton_Label": {
    "fontSize": "12px",
    "textTransform": "capitalize",
    "alignItems": "center"
  },
  "NavBar": {
    "verticalAlign": "top",
    "background": "white"
  },
  "ProfileImage": {
    "fontSize": "20px",
    "alignItems": "center",
    "background": "white"
  }
}
class NavBar extends Component{
  constructor(){
    super()
  }
  render (){
    return(
      <div style={styling}> 
      <div  className="NavBar">
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
  </div>
  )

  }
}
export default NavBar;