import React, {Component, useEffect} from 'react';
import { render } from 'react-dom';
import {FormGroup,Radio,RadioGroup, Form, Row, Panel, FlexboxGrid} from 'rsuite'


const styles = {
  radioGroupLabel: {
    margin: '10',
    padding: '10px 300px 8px 10px',
    width: '100px',
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
    <FlexboxGrid style={{"marginTop":"10"}} justify="center">
          <FlexboxGrid.Item colspan={22}>
            <Panel  header={<h3>Notification Settings</h3>} >
              <Form fluid layout="inline">
                <FormGroup  controlId="radioList">
                    <Row >
                      <RadioGroup name="radioList" inline appearance="picker" defaultValue="B">
                        <div style={styles.radioGroupLabel}>Email Notifications</div>
                        <Radio value="A">Enabled</Radio>
                        <Radio value="B">Disabled</Radio>
                      </RadioGroup>
                    </Row>
                    
                    <Row>
                      <RadioGroup name="radioList" inline appearance="picker" defaultValue="B">
                        <div style={styles.radioGroupLabel}>SMS Notifications</div>
                        <Radio value="A">Enabled</Radio>
                        <Radio value="B">Disabled</Radio>
                      </RadioGroup>
                    </Row>

                    <Row>
                      <RadioGroup name="radioList" inline appearance="picker" defaultValue="B">
                        <div style={styles.radioGroupLabel}>Push Notifications</div>
                        <Radio value="A">Enabled</Radio>
                        <Radio value="B">Disabled</Radio>
                      </RadioGroup>
                    </Row>
                  
                </FormGroup>
              </Form>
              </Panel>
        </FlexboxGrid.Item>
    </FlexboxGrid>
              )
}
}
export default Notify
