import React, {Component} from 'react'
import {Radio, RadioGroup, Panel, Alert} from 'rsuite'
import {getSystemState, updateSystemState} from '../api/api'
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
            system_state : "",
            prev : ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.displayAlert = this.displayAlert.bind(this)
        this.setSystemState = this.setSystemState.bind(this)
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

    async handleChange(name, value) {
        await this.setState({
          prev : this.state.system_state,
          [name]: value
        }, this.displayAlert);
        //console.log(name, value);
        updateSystemState(value, this.state.system_state, this.setSystemState )
    }

    setSystemState(val){
        console.log(val)
        this.setState({system_state : val})
        console.log(this.state.system_state)
    }

    componentDidMount(){
        getSystemState(this.setSystemState)
    }

    render(){
        return(
        <Panel header={<h3>System State</h3>} shaded align='center'>
                    <RadioGroup 
                        style={{fontSize : '22px'}}
                        name="radioList" 
                        inline appearance="picker" 
                        value= {this.state.system_state}
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