import Link from "next/link";
import { Component } from "react";

class NavButton extends Component{
  constructor(){
    super()
  }
  render(){
    return(
      
        <Link href={this.props.path}>
          <div className="NavButton">
            <div className="Icon">{this.props.icon}</div>
            <span className="Label">{this.props.label}</span>
          </div>
        </Link>
    )
  }
}


export default NavButton;