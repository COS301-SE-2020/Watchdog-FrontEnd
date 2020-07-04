import React, {Component, useEffect} from 'react';
import { render } from 'react-dom';
import {FormGroup,Radio,RadioGroup,} from 'rsuite'


const styles = {
  radioGroupLabel: {
    margin: '10px',
    padding: '10px 300px 8px 10px',
    display: 'inline-block',
    verticalAlign: 'middle'
  }
};
class Notify extends Component{
  constructor(){
    super()
  }
render(){
  return(
<FormGroup style={{margin:'10px'}} controlId="radioList">
    <hr />
    <div>
    <RadioGroup name="radioList" inline appearance="picker" defaultValue="B">
      <span style={styles.radioGroupLabel}>Email Notifications </span>
      <Radio value="A">Enabled</Radio>
      <Radio value="B">Disabled</Radio>
    </RadioGroup>
    </div>
    <hr />
    
    <div>
    <RadioGroup name="radioList" inline appearance="picker" defaultValue="B">
      <span style={styles.radioGroupLabel}>SMS  Notifications </span>
      <Radio value="A">Enabled</Radio>
      <Radio value="B">Disabled</Radio>
    </RadioGroup>
    </div>
    <hr />
  </FormGroup>
  )
}
}
export default Notify
