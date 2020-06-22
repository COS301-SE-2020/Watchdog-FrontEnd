import Header from '../components/Header'
import navButtons from "../config/buttons"
import NavBar from "../components/NavBar";
import React, {Component} from 'react';
class Landing extends Component{
  constructor(){
    super();
  }
render(){
    return (
      <div>
        <Header />
        <NavBar navButtons={navButtons} />
    </div>
    )
  }
}
export default Landing