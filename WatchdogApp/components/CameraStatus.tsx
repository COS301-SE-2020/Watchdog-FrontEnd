import React, { Component } from 'react'
import { Button, Icon, List, ListItem, Divider, Text, Layout } from '@ui-kitten/components'


const Data = new Array(8).fill({
    location: 'Bedroom',
    status: 'Online',
  })

interface cameraStatus{
    location: string
    status: string
    
}
interface propsCameraStatus{

}

interface stateCameraStatus{
    data : cameraStatus[]
}

class CameraStatus extends Component<propsCameraStatus, stateCameraStatus> {

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
                title ={`${item.item.location}` }
                //accessoryRight={item.item.status==='Online'?renderItemIconOnline : renderItemIconOfline}
                accessoryLeft ={()=><Text style={{paddingRight:20}}>{item.index+1}</Text>}
                //accessoryRight={evaProps => <Icon  {...evaProps} name={item.item.status==='Online'?'video-outline' : 'video-off-outline'}/>}
                accessoryRight={evaProps => <Button   status={item.item.status==='Online'?'success' : 'danger'} accessoryRight={evaProps => <Icon  {...evaProps} name={item.item.status==='Online'?'video-outline' : 'video-off-outline'}/>}>
                                                {''}
                                            </Button>}
                
               
            />
           

            
        )

    }
    render() {
        
       
        return (
            
            <List ItemSeparatorComponent={Divider} style={{maxHeight:280}} data={this.state.data} renderItem={this.renderItem} />
             
            
        )
    }
}

export default CameraStatus