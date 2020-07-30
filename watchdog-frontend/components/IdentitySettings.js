import React, { Component } from 'react'
import {Panel, Avatar, Grid, Row, Col, IconButton, Icon, Whisper, Tooltip, FlexboxGrid, Alert} from 'rsuite'
import RemoveIdentityModal from './RemoveIdentityModal'
import AddIdentityModal from './AddIdentityModal'
import {getIdentities, deleteIdentity} from '../api/api'
import Loading from './Loading'
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
            loaded : false,
            showRemoveModal : false,
            showAddModal : false,
            removeId : 0,
            toRemove : {},
            users : []
        }

        this.toggleRemoveModal = this.toggleRemoveModal.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.toggleAddModal = this.toggleAddModal.bind(this)
        this.setUser = this.setUser.bind(this)
        this.addToList = this.addToList.bind(this)
        this.updateList = this.updateList.bind(this)
        this.removeFromList = this.removeFromList.bind(this)
        
    }

    toggleRemoveModal(){
        this.setState({showRemoveModal : !this.state.showRemoveModal})
    }

    toggleAddModal(){
        this.setState({showAddModal : !this.state.showAddModal}, ()=>{
            
        })
    }

    handleRemove(){
        //console.log("here")
        //this.setState({users : temp, showRemoveModal : !this.state.showRemoveModal})
       // console.log(this.state.toRemove.id)
        deleteIdentity(this.state.toRemove.id,
            ()=>{
                this.removeFromList(this.state.toRemove.name)
                this.setState({showRemoveModal : !this.state.showRemoveModal})
            },
            ()=>{
                Alert.error("Unable to remove identity.", 3000)
                this.setState({showRemoveModal : !this.state.showRemoveModal})
            }
        )
        // this.removeFromList(this.state.toRemove.name)
        // this.setState({showRemoveModal : !this.state.showRemoveModal})


    }
    
    setUser(user_list){
        this.setState({users : user_list, loaded: true})
    }


    async updateList(){
        this.setState({loaded:false}, this.componentDidMount)
        
    
        //getIdentities(this.setUser)
    }

    removeFromList(name){
        let filter_list = this.state.users.filter((item)=>{
            return item.name!==name
        })

        this.setState({users : filter_list})
    }

    addToList(user){
        let users =[
            ...this.state.users,
            {
                id : this.state.users.length,
                name : user.name,
                img : user.img  
            }
            
        ]

        console.log(user.img)

        this.setState({users: users})
    }

    componentDidMount(){
        getIdentities(this.setUser)
        
        

    }
    
    render(){
        let users_array = this.state.users.map((item)=>{
            //console.log(item)
            if(this.state.loaded===false){
                return(<Loading />)
            }
            return(
                <Row key={item.id} fluid>
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
        <FlexboxGrid style={{"marginTop":"10"}} justify="center">
          <FlexboxGrid.Item colspan={22}>
            <Panel  header={<h3>Identity Settings</h3>} >
                <Panel shaded>
                    <Grid fluid>
                        {users_array}
                    </Grid>  
                </Panel>
                <br></br>
                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Add Identity.</Tooltip>}>
                    <IconButton onClick={this.toggleAddModal} icon={<Icon icon="plus-square" />} circle size="lg" />
                </Whisper>
                <RemoveIdentityModal 
                            user_id={this.state.toRemove.id}
                            local_list_remove = {this.removeFromList}
                            name={this.state.toRemove.name} 
                            toDisplay={this.state.showRemoveModal} 
                            toClose={this.toggleRemoveModal} 
                            remove={this.handleRemove}/>
                <AddIdentityModal
                 current_list = {this.state.users}
                 local_list_add = {this.addToList}
                 toDisplay={this.state.showAddModal} 
                 toClose={this.toggleAddModal}
                 updatelist ={this.updateList}
                />

            </Panel>
            </FlexboxGrid.Item>
    </FlexboxGrid>

        )
    }

}

export default IdentitySettings