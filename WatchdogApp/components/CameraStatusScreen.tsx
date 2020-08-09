import React, { Component } from 'react';
import { Button, Icon, List, ListItem, Divider, Text, Layout } from '@ui-kitten/components'

import CameraStatus from './CameraStatus'

const Data = new Array(100).fill({
    location: 'Bedroom',
    status: 'Online',
  })

interface cameraStatus{
    location: string
    status: string
    
}
interface propsCameraStatusScreen{

}

interface stateCameraStatusScreen{
    data : cameraStatus[]
}

class CameraStatusScreen extends Component<propsCameraStatusScreen, stateCameraStatusScreen> {
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
            <Layout style ={{flex :1}}>
                <List ItemSeparatorComponent={Divider}  data={this.state.data} renderItem={this.renderItem} />
            </Layout>
        );
    }
}

export default CameraStatusScreen;