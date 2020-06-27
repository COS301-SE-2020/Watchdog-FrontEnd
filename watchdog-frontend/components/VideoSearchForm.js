import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { hot } from 'react-hot-loader'
import screenfull from 'screenfull'
import {Button,ButtonToolbar,Dropdown,Modal,Form,Radio,DatePicker,FormGroup,ControlLabel,SelectPicker}  from 'rsuite'
const data = [
    {
      "label": "Lounge",
      "value": "Lounge",
      "role": "Master"
    },
    {
      "label": "Hall",
      "value": "Hall",
      "role": "Master"
    },
    {
      "label": "Kitchen",
      "value": "Kitchen",
      "role": "Master"
    },
    {
      "label": "Yard",
      "value": "Yard",
      "role": "Master"
    },
    {
      "label": "Front Gate",
      "value": "Front Gate",
      "role": "Master"
    },
    {
      "label": "Toilet",
      "value": "Toile",
      "role": "Master"
    }];

class form extends Component{
    constructor(){
    super()
    };
   render(){
  
    return (
        <Form>
        <FormGroup>
          <ControlLabel>Choose Camera</ControlLabel>
          <SelectPicker data={data} block />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Choose Date</ControlLabel>
          <DatePicker appearance="default" block/>
        </FormGroup>
        <FormGroup>
        <ControlLabel>Choose Time</ControlLabel>
    <DatePicker format="HH:mm:ss" ranges={[]} block />
    </FormGroup>
      </Form>
    );
  }
}
export default form