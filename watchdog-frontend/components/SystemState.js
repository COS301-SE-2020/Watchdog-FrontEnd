import React, {Component} from 'react'
import {Radio, RadioGroup, Panel, Alert} from 'rsuite'

const styles = {
    radioGroupLabel: {
      padding: '8px 2px 8px 10px',
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  };

class SystemState extends Component{
    constructor(){
        super()
        this.state ={
            system_state : "Armed"
        }

        this.handleChange = this.handleChange.bind(this)
        this.displayAlert = this.displayAlert.bind(this)
    }

    displayAlert(){
        Alert.closeAll()
        if(this.state.system_state==="Armed")
            Alert.success('Armed Successfully, Notifications switched on for all movement')
        
        if(this.state.system_state==="Disarmed")
            Alert.error('Notifications switched off for all movements')

        if(this.state.system_state==="Recognised")
            Alert.warning('Intruders will now be detected, Add Recognised Personel in Profile page')

    }

    handleChange(name, value) {
        this.setState({
          [name]: value
        }, this.displayAlert);
        //console.log(name, value);
    }

    render(){
        return(
            <Panel header="System State" shaded>
                    <RadioGroup 
                        name="radioList" 
                        inline appearance="picker" 
                        defaultValue="Armed" 
                        onChange={value => {
                            this.handleChange('system_state', value);
                          }}>
                            <span style={styles.radioGroupLabel}>State: </span>
                            <Radio value="Armed">Armed</Radio>
                            <Radio value="Recognised">Recognised Only</Radio>
                            <Radio value="Disarmed">Disarmed</Radio>
                    </RadioGroup>
                
            </Panel>
        )
    }

}

export default SystemState