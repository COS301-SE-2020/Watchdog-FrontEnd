import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { hot } from 'react-hot-loader'
import screenfull from 'screenfull'
import load from '../components/VideoFrameViewer'
import {Button,ButtonToolbar,Dropdown,Modal,Form,Radio,DatePicker,FormGroup,ControlLabel,SelectPicker, Loader}  from 'rsuite'
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
        <Button onClick={()=>this.load('https://www.youtube.com/watch?v=oUFJJNQGwhk')}>CLick me</Button>
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