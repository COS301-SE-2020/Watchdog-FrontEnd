import React, { Component } from 'react';
import { Layout, Icon, List, ListItem, Divider, Text } from '@ui-kitten/components'
import { connect } from 'react-redux'
import moment from 'moment'

import { getLogs } from '../app-redux/actions'

// const Data = new Array(100).fill({
//     message: 'This is a test for an extrememly long log message. This is a test for an extrememly long log message',
//     date: '12/06/2020',
//     time: '17:55:22'
// })

interface LogsMessage {
    message: string,
    timestamp: string
}
interface propsLogs {
    logs: LogsMessage[],
    loading: boolean,
    load: Function
}

interface stateLogs {
    data: LogsMessage[]
}

class CameraLogsScreen extends Component<propsLogs, stateLogs> {
    constructor(props: any) {
        super(props)
        // this.state = {
        //     data: Data
        // }

        this.renderItem = this.renderItem.bind(this)
    }

    renderItem(item) {
        //console.log(item)

        return (
            <ListItem
                title={`${item.item.message}`}
                description={`${moment.unix(item.item.timestamp).format("DD/MM/YYYY HH:MM:SS")}`}
                // description={`${item.item.date} ${item.item.time}`}
                //accessoryRight={item.item.status==='Online'?renderItemIconOnline : renderItemIconOfline}
                accessoryLeft={() => <Text style={{ padding: 20 }}>{item.index + 1}</Text>}

            //accessoryRight={evaProps => <Icon  {...evaProps} name={item.item.status==='Online'?'video-outline' : 'video-off-outline'}/>}



            />


        )
    }
    render() {
        return (
            <List
                refreshing={this.props.loading}
                onRefresh={() => this.props.load()}
                ItemSeparatorComponent={Divider}
                data={this.props.logs}
                renderItem={this.renderItem}
            />
        );
    }
}

const mapStoreToProps = (store, ownProps) => ({
    loading: store.UI.Logs.loading,
    logs: store.Data.logs
})
const mapDispatchToProps = (dispatch) => ({
    load: () => dispatch(getLogs())
})

export default connect(mapStoreToProps, mapDispatchToProps)(CameraLogsScreen)