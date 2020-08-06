import React, { Component } from 'react';
import { Button, Icon, List, ListItem, Divider, Text } from '@ui-kitten/components'

const Data = new Array(8).fill({
    message: 'This is a test for an extrememly long log message. This is a test for an extrememly long log message',
    date: '12/06/2020',
    time: '17:55:22'
  })

interface LogsMessage{
    message: string
    date: string
    time : string
}
interface propsLogs{

}

interface stateLogs{
    data : LogsMessage[]
}
class Logs extends Component<propsLogs, stateLogs> {
    constructor(props: any){
        super(props)
        this.state ={
            data : Data
        }

        this.renderItem = this.renderItem.bind(this)
    }

    renderItem(item){
        //console.log(item)
        
        return(
            <ListItem
                title ={`${item.item.message}` }
                description={`${item.item.date} ${item.item.time}`}
                //accessoryRight={item.item.status==='Online'?renderItemIconOnline : renderItemIconOfline}
                accessoryLeft ={()=><Text style={{paddingRight:20}}>{item.index+1}</Text>}
                
                //accessoryRight={evaProps => <Icon  {...evaProps} name={item.item.status==='Online'?'video-outline' : 'video-off-outline'}/>}
                
                
               
            />

            
        )
    }
    render() {
        
        return (
            <List ItemSeparatorComponent={Divider} style={{maxHeight:280}} data={this.state.data} renderItem={this.renderItem} />
        );
    }
}

export default Logs;