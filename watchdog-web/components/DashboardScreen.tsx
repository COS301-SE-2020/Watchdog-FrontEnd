import React, { Component } from 'react';
import { Panel } from 'primereact/panel';
import { Chart } from 'primereact/chart';

import { connect } from 'react-redux';

import SecurityLevelPanel from './SecurityLevelPanel';
import CameraView from './CameraView';
import Events from './Events';

interface DashboardScreenProps {}

interface DashboardScreenState {
    pieData: object
    lineData: object
}

class DashboardScreen extends Component<DashboardScreenProps, DashboardScreenState> {
    constructor(props) {
        super(props);

        this.state = {
            pieData: {
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [
                            "#FFC107",
                            "#03A9F4",
                            "#4CAF50"
                        ],
                        hoverBackgroundColor: [
                            "#FFE082",
                            "#81D4FA",
                            "#A5D6A7"
                        ]
                    }]
            },
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
            },
        }
    }

    render() {
        return (
            <div
                className="flexgrid dashboard"
            >
                <div className="p-grid p-align-stretch">
                    <div className="p-col-12 p-md-6 p-lg-6">
                        <div className="p-grid">
                            <div className="p-col-4 systemState" style={{ minHeight: '40vh', width: '50%' }}>
                                <SecurityLevelPanel />
                            </div>
                            <div className="p-col-4" style={{ minHeight: '40vh', width: '50%' }}>
                                <Events/>
                            </div>
                            <div className="p-col-12" style={{ height: '40vh' }}>
                                <Panel header="Analytics" style={{ height: '100%' }} className="p-shadow-8">
                                    <Chart
                                        className="analytics"
                                        type="line"
                                        data={this.state.lineData}
                                        options={{
                                            legend: { position: 'bottom' },
                                            title: {
                                                display: true,
                                                text: 'Identified Activity',
                                            },
                                            layout: {
                                                padding: {
                                                    left: 0,
                                                    right: 0,
                                                    top: 0,
                                                    bottom: 0
                                                }
                                            },
                                        }}
                                        height="100%"
                                    />
                                </Panel>
                            </div>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-6" style={{ minHeight: '82vh' }}>
                        <div style={{ minHeight: '82vh' }} className="panel p-shadow-8">
                            <CameraView />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStoreToProps = (store) => ({})
const mapDispatchToProps = (dispatch) => ({})

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(DashboardScreen);