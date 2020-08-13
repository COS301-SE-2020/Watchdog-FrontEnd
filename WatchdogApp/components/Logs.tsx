import React, { Component } from 'react';
import { Button, Icon, List, ListItem, Divider, Text } from '@ui-kitten/components'
import { connect } from 'react-redux'
import moment from 'moment'

import { getLogs } from '../app-redux/actions'

const Data = new Array(8).fill({
    message: 'This is a test for an extrememly long log message. This is a test for an extrememly long log message',
    date: '12/06/2020',
    time: '17:55:22'
})

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

class Logs extends Component<propsLogs, stateLogs> {
    constructor(props: any) {
        super(props)
        // this.state ={
        // data : Data
        // }

        this.renderItem = this.renderItem.bind(this)
    }

    renderItem(item) {
        return (
            <ListItem
                title={`${item.item.message}`}
                description={`${moment.unix(item.item.timestamp).format("DD/MM/YYYY HH:MM:SS")}`}
                //accessoryRight={item.item.status==='Online'?renderItemIconOnline : renderItemIconOfline}
                accessoryLeft={() => <Text style={{ paddingRight: 20 }}>{item.index + 1}</Text>}
            //accessoryRight={evaProps => <Icon  {...evaProps} name={item.item.status==='Online'?'video-outline' : 'video-off-outline'}/>}
            />
        )
    }

    componentDidMount = () => {
        this.props.load()
    }

    render() {
        return (
            <List
                refreshing={this.props.loading}
                onRefresh={() => this.props.load()}
                ItemSeparatorComponent={Divider}
                style={{ maxHeight: 280 }}
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

export default connect(mapStoreToProps, mapDispatchToProps)(Logs);