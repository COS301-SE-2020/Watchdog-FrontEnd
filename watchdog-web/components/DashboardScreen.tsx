import React, { Component } from 'react';
import { Card } from 'primereact/card';
import { RadioButton } from 'primereact/radiobutton';
import CameraView from './CameraView';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Panel } from 'primereact/panel';
import { Chart } from 'primereact/chart';


class DashboardScreen extends Component {
    constructor(props) {
        super(props);

        this.categories = [
            {
                name: 'Disabled',
                key: '0',
                // color: 'rgb(184, 103, 103)'
                color: 'red',
                description: "Notifications will be sent for all movement"
            },
            {
                name: 'Recognised Only',
                key: '1',
                // color: 'rgb(184, 172, 103)'
                color: 'lightyellow',
                description: "Intruders will be detected. Add recognised personel in the profile page"
            },
            {
                name: 'Armed',
                key: '2',
                color: 'green',
                description: "Notifications will be switched off for all movement"
            }
        ];

        this.state = {
            selectedCategory: this.categories[1],
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
                                <Panel className="p-shadow-8" header="System State" style={{ minHeight: '40vh' }}>
                                    <div style={{ marginTop: '1rem' }}></div>
                                    {
                                        this.categories.map((category) => {
                                            return (
                                                <div key={category.key} className="p-field-radiobutton">
                                                    <RadioButton style={{}} inputId={category.key} name="category" value={category} onChange={(e) => this.setState({ selectedCategory: e.value })} checked={this.state.selectedCategory.key === category.key} />
                                                    <label htmlFor={category.key} style={{ color: category.color }}>{category.name}</label>
                                                </div>
                                            )
                                        })
                                    }
                                    <Card style={{ color: 'grey', backgroundColor: 'rgba(0, 0, 0, 0.15)', marginTop: '2rem' }}>
                                        {
                                            this.state.selectedCategory.description
                                        }
                                    </Card>
                                </Panel>
                            </div>
                            <div className="p-col-4" style={{ minHeight: '40vh', width: '50%' }}>
                                <Panel header="Recent Events" className="p-shadow-8" style={{ minHeight: '40vh'}}>
                                    <div style={{ maxHeight: '30vh', overflow: 'scroll' }}>
                                        <Card style={{ borderRadius: 0, marginBottom: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.15)' }} header={<p style={{padding: 5, margin: 0, color: 'grey'}}>Timestamp</p>} className="p-shadow-4 recent-event"> This is a notification alert/event/whatever </Card>
                                        <Card style={{ borderRadius: 0, marginBottom: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.15)' }} header={<p style={{padding: 5, margin: 0, color: 'grey'}}>Timestamp</p>} className="p-shadow-4 recent-event"> This is a notification alert/event/whatever </Card>
                                        <Card style={{ borderRadius: 0, marginBottom: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.15)' }} header={<p style={{padding: 5, margin: 0, color: 'grey'}}>Timestamp</p>} className="p-shadow-4 recent-event"> This is a notification alert/event/whatever </Card>
                                        <Card style={{ borderRadius: 0, marginBottom: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.15)' }} header={<p style={{padding: 5, margin: 0, color: 'grey'}}>Timestamp</p>} className="p-shadow-4 recent-event"> This is a notification alert/event/whatever </Card>
                                    </div>
                                </Panel>
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
                        <ScrollPanel style={{ minHeight: '82vh' }} className="panel p-shadow-8">
                            <CameraView />
                        </ScrollPanel>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardScreen;