import React, {Component, useEffect} from 'react';
import { render } from 'react-dom';
import  { Auth } from 'aws-amplify'
import {FormGroup,Form,FormControl,FlexboxGrid,ControlLabel,Button,ButtonToolbar, Panel, HelpBlock, Alert} from 'rsuite'

class Pass extends Component{
    constructor(){
        super()
        this.state = {
          old_password : "",
          new_password : "",
          confirm_password : ""
        }
        this.passwordChange = this.passwordChange.bind(this)
    }

    async passwordChange(){
      //check not null
      //check old==new
      //check new==confirm
      //data checks regex
      if(this.state.old_password===""){
        Alert.error("Please enter your old password", 3000)
        return
      }

      if(this.state.new_password===""){
        Alert.error("Please enter your new password", 3000)
        return
      }

      if(this.state.confirm_password===""){
        Alert.error("Please confirm your new password", 3000)
        return
      }

      if(this.state.confirm_password !== this.state.new_password){
        Alert.error("Passwords dont match", 3000)
        return
      }

      if(!this.state.new_password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
        Alert.error("Invalid Password. Password must be 8 characters long, contain: an uppercase character, a number and a special character", 3000)
        return
      }

      try {
        let currentUser = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(
          currentUser,
          this.state.old_password,
          this.state.new_password
        ).then(
          ()=>{
            Alert.success("Password changed",3000)

            this.setState({old_password : "",
            new_password : "",
            confirm_password : ""})
           
          }
          
        );
  
        
      } catch (error) {
        //Alert.error(error)
        Alert.error("Incorrect current password", 3000)
        console.log(error)
       
          
      }
      //console.log("sdad")

      this.setState({old_password : "",
                      new_password : "",
                      confirm_password : ""})

      



    }
    render(){
        return(
          <FlexboxGrid style={{"marginTop":"50px"}} justify="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel header={<h3>Change Password</h3>} bordered>
              <Form fluid   ref={ref => (this.form = ref)} >
                <FormGroup>
                  <ControlLabel>Current Password</ControlLabel>
                  <FormControl ref={ref => (this.old = ref)}  onChange={(val)=>{
                    console.log(val)
                    this.setState({old_password : val})

                  }} value={this.state.old_password} name="password" type="password" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>New Password</ControlLabel>
                  <FormControl onChange={(val) =>{
                    this.setState({new_password : val})
                  }} value={this.state.new_password} name="password" type="password" />
                  <HelpBlock tooltip>Password must be 8 characters long, contain: an uppercase character, a number and a special character</HelpBlock>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Confirm New Password</ControlLabel>
                  <FormControl va onChange={(val) =>{
                    this.setState({confirm_password : val})
                  }} value={this.state.confirm_password} name="confirm_password" type="password" />
                  <HelpBlock tooltip>Please renter your new password</HelpBlock>
                </FormGroup>
                <FormGroup>
                  <ButtonToolbar>
                    <Button onClick={this.passwordChange} appearance="primary">Change Password</Button>
                  
                  </ButtonToolbar>
                </FormGroup>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
            // <Form layout='horizontal'>
            //   <FormGroup>
            //     <ControlLabel>Current Password</ControlLabel>
            //     <FormControl name="password" type="password"  />
            //     <HelpBlock tooltip>Required</HelpBlock>
            //   </FormGroup>
            //   <FormGroup>
            //     <ControlLabel>New Password</ControlLabel>
            //     <FormControl name="password" type="password" />
            //     <HelpBlock tooltip>Required</HelpBlock>
            //   </FormGroup>
            //   <FormGroup>
            //     <ControlLabel>Re-type New Password</ControlLabel>
            //     <FormControl name="password" type="password" />
            //     <HelpBlock tooltip>Required</HelpBlock>
            //   </FormGroup>
              
            //   <FormGroup>
            //     <ButtonToolbar>
            //       <Button appearance="primary">Submit</Button>
            //     </ButtonToolbar>
            //   </FormGroup>
            // </Form>
        )
    }
}
export default Pass