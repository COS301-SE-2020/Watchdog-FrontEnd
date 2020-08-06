import React, { Component } from 'react'
import { Button, Icon, List, ListItem, Divider } from '@ui-kitten/components'
import { Text } from 'react-native'

  

const renderItemIconOnline = (props) => (
    <Icon {...props} name='checkmark-outline'/>
);
  
const renderItemIconOfline = (props) => (
<Icon {...props} name='close-outline'/>
);

class CameraStatus extends Component {

    constructor(props: any){
        super(props)

        this.renderItem = this.renderItem.bind(this)
    }

    renderItem(item){
        //console.log(item)
        
        return(
            <ListItem
                title ={`${item.index + 1}. ${item.item.location}` }
                //accessoryRight={item.item.status==='Online'?renderItemIconOnline : renderItemIconOfline}
                
                //accessoryRight={evaProps => <Icon  {...evaProps} name={item.item.status==='Online'?'video-outline' : 'video-off-outline'}/>}
                accessoryRight={evaProps => <Button   status={item.item.status==='Online'?'success' : 'danger'} accessoryRight={evaProps => <Icon  {...evaProps} name={item.item.status==='Online'?'video-outline' : 'video-off-outline'}/>}>
                                                
                                            </Button>}
                
               
            />

            
        )

    }
    render() {
        const data = new Array(8).fill({
            location: 'Bedroom',
            status: 'Online',
          })
       
        return (
            <List ItemSeparatorComponent={Divider} style={{maxHeight:280}} data={data} renderItem={this.renderItem} >
               
            </List>
        )
    }
}

export default CameraStatus