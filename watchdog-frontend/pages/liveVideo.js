import Header from '../components/Header'
import navButtons from "../config/buttons"
import React, {Component} from 'react';
import NavBar from "../components/NavBar";
class liveVideo extends Component{
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
export default liveVideo