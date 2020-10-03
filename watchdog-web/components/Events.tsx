import React, { Component } from 'react';
import { Panel } from 'primereact/panel';
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux';
import { getLogs } from '../app-redux/actions';
import { Card } from 'primereact/card';
import moment from 'moment';
import { ProgressBar } from 'primereact/progressbar';

interface EventsProps {
    fetch: Function
    loading: boolean
    logs: any[]
}

interface EventsState {
    lineData: any
}

class Events extends Component<EventsProps, EventsState> {

    constructor(props) {
        super(props);
        this.state = {
            lineData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: '#03A9F4'
                    },
                    {
                        label: 'Second Dataset',
                        data: [28, 48, 40, 19, 86, 27, 90],
                        fill: false,
                        borderColor: '#FFC107'
                    }
                ]
            }
        }
    }

    componentDidMount = () => {
        this.props.fetch();
    }

    render() {

        const comps: any[] = [];
        this.props.logs.forEach((element, i) => {
            comps.push(<Card key={i} style={{ borderRadius: 0, marginBottom: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.15)' }} header={<p style={{ padding: 5, margin: 0, color: 'grey' }}>{moment.unix(element.timestamp).format('DD-MM-YYYY')}</p>} className="p-shadow-4 recent-event">{element.message}</Card>);
        });

        comps.reverse()

        return <Panel header={<span><span>System Events</span></span>} className="p-shadow-8" style={{ minHeight: '40vh' }}>
            <Scrollbars style={{ height: '30vh' }}>
                <div style={{ display: (this.props.loading) ? "block" : "none", padding: 0, margin: 0 }}>
                    <ProgressBar style={{ height: '6px', padding: 0, margin: 0, borderRadius: 0 }} mode="indeterminate" />
                </div>

                <div style={{ maxHeight: '30vh' }}>
                    {
                        comps
                    }
                </div>
            </Scrollbars>

        </Panel>
    }
}

const mapStoreToProps = (store) => ({
    loading: store.UI.Logs.loading,
    logs: store.Data.logs,
})

const mapDispatchToProps = (dispatch) => ({
    fetch: () => dispatch(getLogs())
})

export default connect(
    mapStoreToProps, mapDispatchToProps
)(Events);