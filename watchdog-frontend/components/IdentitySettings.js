import React, { Component } from 'react'
import { Panel, Avatar, Grid, Row, Col, IconButton, Icon, Whisper, Tooltip, FlexboxGrid, Alert, Modal, Input, RadioGroup, InputGroup, Radio, Button } from 'rsuite'
import RemoveIdentityModal from './RemoveIdentityModal'
import AddIdentityModal from './AddIdentityModal'
import { getIdentities, deleteIdentity, updateIdentityNotification } from '../api/api'
import Loading from './Loading'
import IdentityNotification from './IdentityNotification'
const test_users = [
    {
        id: 1,
        name: "Luqmaan Badat",
        img: "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    },
    {
        id: 2,
        name: "Some Name 2",
        img: "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    }
]

const styles_input = {
    width: 350,
    marginBottom: 10
}
const styles = {
    radioGroupLabel: {
        padding: '8px 8px 8px 10px',
        display: 'inline-block',
        verticalAlign: 'middle'
    },

    radioBtn: {
        paddingRight : '8px',
        verticalAlign: 'middle'
    }
}
class IdentitySettings extends Component {
    constructor() {
        super()
        this.state = {
            loaded: false,
            showRemoveModal: false,
            showAddModal: false,
            removeId: 0,
            toRemove: {},
            users: [],
            loading: false,
            settingsModal: false,
            recieveNotification: '0',
            notificationMessage: '',
            img_key: null,
            updating : false
        }

        this.toggleRemoveModal = this.toggleRemoveModal.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.toggleAddModal = this.toggleAddModal.bind(this)
        this.setUser = this.setUser.bind(this)
        this.addToList = this.addToList.bind(this)
        this.updateList = this.updateList.bind(this)
        this.removeFromList = this.removeFromList.bind(this)
        this.toggleSettingsModal = this.toggleSettingsModal.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)

    }

    async handleUpdate(){
        this.setState({updating : true})

        
        console.log(this.state.recieveNotification)
        

        await updateIdentityNotification(this.state.img_key, this.state.notificationMessage, this.state.recieveNotification, ()=>Alert.success("Successfully updated", 3000), ()=>Alert.error("Fail to update", 3000))

        await this.setState({updating : false})
        this.toggleSettingsModal()
        this.updateList()

    }

    toggleRemoveModal() {
        this.setState({ showRemoveModal: !this.state.showRemoveModal })
    }

    toggleAddModal() {
        this.setState({ showAddModal: !this.state.showAddModal }, () => {

        })
    }

    toggleSettingsModal() {
        this.setState({ settingsModal: !this.state.settingsModal })

    }

    handleRemove() {
        //console.log("here")
        //this.setState({users : temp, showRemoveModal : !this.state.showRemoveModal})
        // console.log(this.state.toRemove.id)
        this.setState({ loading: true, showRemoveModal: !this.state.showRemoveModal })
        deleteIdentity(this.state.toRemove.id,
            () => {
                this.updateList()
                this.setState({ loading: false })
            },
            () => {
                Alert.error("Unable to remove identity.", 3000)
                this.setState({ loading: false })
            }
        )
        // this.removeFromList(this.state.toRemove.name)
        // this.setState({showRemoveModal : !this.state.showRemoveModal})


    }

    async setUser(user_list) {
        this.setState({ users: user_list })
    }


    async updateList() {
        //this.setState({loaded:false}, this.componentDidMount)
        //console.log("hello from this func")
        this.setState({ loading: true })
        const date = Date.now()
        let currentDate = null
        do {
            currentDate = Date.now()
        } while (currentDate - date < 5000)
        await getIdentities(this.setUser)
        this.setState({ loading: false })
    }

    removeFromList(name) {
        let filter_list = this.state.users.filter((item) => {
            return item.name !== name
        })

        this.setState({ users: filter_list })
    }

    addToList(user) {
        let users = [
            ...this.state.users,
            {
                id: this.state.users.length,
                name: user.name,
                img: user.img
            }

        ]


        this.setState({ users: users })
    }

    async componentDidMount() {
        this.setState({ loading: true })
        await getIdentities(this.setUser)
        this.setState({ loading: false })



    }

    render() {
        let users_array = this.state.users.map((item) => {

            // if(this.state.loaded===false){
            //     return(<Loading />)
            // }



            if (this.state.loading === true) {
                return (<Loading />)
            }
            return (
                <Panel shaded>
                    <Row key={item.id} fluid>
                        <Col xs={3}>
                            <Avatar size={'lg'} src={item.img} />

                        </Col>
                        <Col xs={15}>
                            <h3>{item.name}</h3>
                        </Col>
                        <Col xs={3} xsOffset={3}>
                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Remove Identity.</Tooltip>}>
                                <IconButton icon={<Icon icon="minus-circle" />} circle size="lg" onClick={() => {
                                    this.setState({ toRemove: item, showRemoveModal: !this.state.showRemoveModal })
                                }} />
                            </Whisper>

                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Notification Settings.</Tooltip>}>
                                <IconButton onClick={async () => {
                                    await this.setState({ recieveNotification: item.monitor.watch, notificationMessage: item.monitor.custom_message, img_key: item.img_key })
                                    console.log(this.state.notificationMessage)
                                    this.toggleSettingsModal()
                                }} style={{ marginLeft: '3px' }} icon={<Icon icon="setting" />} circle size="lg" />
                            </Whisper>


                        </Col>

                    </Row>
                </Panel>

            )
        })
        return (
            <FlexboxGrid style={{ "marginTop": "10" }} justify="center">
                <FlexboxGrid.Item colspan={22}>
                    <Panel header={<h3>Identity Settings</h3>} >
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
                            local_list_remove={this.removeFromList}
                            name={this.state.toRemove.name}
                            toDisplay={this.state.showRemoveModal}
                            toClose={this.toggleRemoveModal}
                            remove={this.handleRemove} />
                        <AddIdentityModal
                            current_list={this.state.users}
                            local_list_add={this.addToList}
                            toDisplay={this.state.showAddModal}
                            toClose={this.toggleAddModal}
                            updatelist={this.updateList}
                        />

                    </Panel>
                </FlexboxGrid.Item>
                {/* <IdentityNotification imgKey = {this.state.img_key} notificationMessage = {this.state.notificationMessage} recieveNotification={this.state.recieveNotification} show={this.state.settingsModal} toggle={this.toggleSettingsModal} /> */}


                <Modal size={'xs'} show={this.state.settingsModal} onHide={this.toggleSettingsModal}>
                    <Modal.Header>
                        <Modal.Title>Modal Title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup style={styles_input} >
                            <InputGroup.Addon>
                                <Icon icon="avatar" />
                            </InputGroup.Addon>
                            <Input value={this.state.notificationMessage} onChange={(val) => this.setState({ notificationMessage: val })} placeholder="Notification Message" />
                        </InputGroup>

                        <RadioGroup onChange={(val) => this.setState({ recieveNotification: val })} style={{ width: '350px' }} name="radioList" inline appearance="picker" defaultValue={`${this.state.recieveNotification}`}>
                            <span style={styles.radioGroupLabel}>Notifications Settings: </span>
                            <Radio style={styles.radioBtn} value="1">Enbaled</Radio>
                            <Radio style={styles.radioBtn} value="0">Disabled</Radio>
                        </RadioGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={this.state.updating} onClick={this.handleUpdate} appearance="primary">
                            Update
                        </Button>
                        <Button disabled={this.state.updating} onClick={this.toggleSettingsModal} appearance="subtle">
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>



            </FlexboxGrid>

        )
    }

}

export default IdentitySettings