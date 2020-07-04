import React, { Component } from 'react'
import {Panel, Avatar, Grid, Row, Col, IconButton, Icon, Whisper, Tooltip} from 'rsuite'
import RemoveIdentityModal from './RemoveIdentityModal'

const test_users = [
    {
        id : 1,
        name : "Luqmaan Badat",
        img : "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    },
    {
        id : 2,
        name : "Some Name 2",
        img : "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    }
]
class IdentitySettings extends Component{
    constructor(){
        super()
        this.state = {
            showRemoveModal : false,
            removeId : 0,
            toRemove : {},
            users : test_users
        }

        this.toggleRemoveModal = this.toggleRemoveModal.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }

    toggleRemoveModal(){
        this.setState({showRemoveModal : !this.state.showRemoveModal})
    }

    handleRemove(id){
        //console.log("here")
        //this.setState({users : temp, showRemoveModal : !this.state.showRemoveModal})
        this.setState({showRemoveModal : !this.state.showRemoveModal})


    }
    
    render(){
        let users_array = this.state.users.map((item)=>{
            //console.log(item)
            return(
                <Row fluid>
                    <Col xs={3}>
                        <Avatar size={'lg'} src={item.img} />

                    </Col>
                    <Col  xs={15}>
                        <h3>{item.name}</h3>
                    </Col>
                    <Col xs={3} xsOffset={3}>
                        <Whisper placement="top" trigger="hover" speaker={<Tooltip>Remove Identity.</Tooltip>}>
                            <IconButton  icon={<Icon icon="minus-circle" />} circle size="lg" onClick={()=>{
                                this.setState({toRemove : item, showRemoveModal : !this.state.showRemoveModal})
                            }} />
                        </Whisper>
                         
                        
                    </Col>

                 </Row>

            )
        }) 
        return(
            <Panel header={<h3>Identity Settings</h3>} bordered>
                <Panel shaded>
                    <Grid fluid>
                        {users_array}
                    </Grid>  
                </Panel>
                <br></br>
                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Add Identity.</Tooltip>}>
                    <IconButton  icon={<Icon icon="plus-square" />} circle size="lg" />
                </Whisper>
                <RemoveIdentityModal 
                            user_id={this.state.toRemove.id}
                            name={this.state.toRemove.name} 
                            toDisplay={this.state.showRemoveModal} 
                            toClose={this.toggleRemoveModal} 
                            remove={this.handleRemove}/>

            </Panel>

        )
    }

}

export default IdentitySettings