import React, {Component} from 'react'
import { Layout, Button, Menu, MenuItem, Select, SelectItem, Input } from '@ui-kitten/components'

interface propsHistoricalSettingsScreen{

}

interface stateHistoricalSettingsScreen{
    clip_interval: string,
    clip_length: string

}

class HistoricalSettingsScreen extends Component<propsHistoricalSettingsScreen, stateHistoricalSettingsScreen> {
    constructor(props : propsHistoricalSettingsScreen){
        super(props)
        this.state ={
            clip_interval : '10',
            clip_length : '10'
        }
    }
    render() {
        return (
            <Layout style={{flex:1, padding: 10}}>
            <Input
                    keyboardType = 'number-pad'
                    value={this.state.clip_interval}
                    style={{ marginVertical: 10 }}
                    label='Clip Interval'
                    onChange ={(val: any)=>this.setState({clip_interval : val.text})}
                    
                    caption='Set clip interval in seconds'
                
                /> 

                <Input
                    keyboardType = 'number-pad'
                    value={this.state.clip_length}
                    style={{ marginVertical: 10 }}
                    label='Clip Length'
                    onChange ={(val: any)=>{
                        console.log(val)
                        this.setState({clip_length : val.text})}}
                    caption='Set clip length in seconds'
                />
                <Button  appearance='outline' status='info'>
                    Update
                </Button>
        </Layout>
        )
    }
}

export default HistoricalSettingsScreen