import React, { Component } from 'react'
import {IconButton,Icon,Modal,Button, Grid,Row,Col}  from 'rsuite'
import { Table } from 'rsuite';
const { Column, HeaderCell, Cell, Pagination } = Table;
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'
import {getLiveList} from '../api/api'
import Loading from './Loading'


import SocketClient from './SocketClient';


var values=[];
var userId;
  class LiveVideo extends Component {
    constructor(){
        super()
        this.state = {
          data: [],
          loaded:false,
          show: false,
          rowData: []
         
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.setRow=this.setRow.bind(this);
        
        
    }
    close() {
      this.setState({ show: false });
    }
    open() {
      this.setState({ show: true });
    }
    
    // handleClickFullscreen = () => {
    //   screenfull.request(findDOMNode(this.player))
    // }
    componentDidMount() {
        
     
      getLiveList( (res)=>{
        console.log(res)
         userId=res.userId
        var panel = res.data.data.control_panel
        console.log(panel)
        for(let site_id in panel){
          for(let location in panel[site_id]){
            if(location=="metadata")
              continue;

            else{
              for(let camera_id in panel[site_id][location])
         
            values.push({
              "camera_id": camera_id,
              "site": site_id,
              "location": location
            })
           
          }
 
      }
    }
      
      console.log(values)
      
        this.setState({loaded : true, data : values})
        
      }, (err)=>console.log(err))
      
  }
  setRow(rowVal){
    this.setState({rowData : rowVal})
  }
 
 
      render(){
        if(this.state.loaded)
          return(
            
            <div >
        <Table
          height={400}
          data={this.state.data}
          
        >
          <Column flexGrow={1} align="center" fixed >
            <HeaderCell>Location</HeaderCell>
             <Cell dataKey="location" />
          </Column>

          
          <Column flexGrow={1} align="center" fixed >
            <HeaderCell>Play</HeaderCell>

            <Cell>
              {row =>{
                return (
                  <IconButton onClick={()=>{this.open(),this.setRow(row)}} icon={<Icon icon="play" />} />
                );
              }}
            </Cell>
          </Column>
        </Table>
        <div className="modal-container">
        <Modal overflow={false} show={this.state.show} onHide={this.close} size='lg' backdrop="static">
          <Modal.Body>
          <Grid fluid>
          <Row fluid>
          <Col fluid xs={24}>
            <SocketClient user={userId} data={this.state.rowData}/>
            </Col>
            </Row>
            
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} appearance="primary">
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      </div>
      </div>
    
          )
          return(<Loading />)
      }
  }
   
export default LiveVideo