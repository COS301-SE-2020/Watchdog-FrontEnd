import React, { Component } from 'react';
import { Card } from 'primereact/card';
import CameraView from './CameraView';
// import { Panel } from 'primereact/panel';

class DashboardScreen extends Component {
    render() {
        return (
            // <div className=''>
            <div
                // style={{ height: '100vh' }}
                className="flexgrid"
            >
                <div className="p-grid p-align-stretch">
                    <div className="p-col-12 p-md-6 p-lg-6">
                        <div className="p-grid">
                            <div className="p-col-12">
                                <Card style={{ minHeight: '40vh' }} className="p-shadow-8">Hello</Card>
                            </div>
                            <div className="p-col-12">
                                <Card style={{ minHeight: '40vh' }} className="p-shadow-8">
                                    <Card>Hello</Card>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-6" style={{ maxHeight: '82vh' }}>
                        {/* <Card style={{}} className="p-shadow-8"> */}
                            <CameraView/>
                        {/* </Card> */}
                    </div>
                </div>
            </div>
            // </div>
        );
    }
}

export default DashboardScreen;