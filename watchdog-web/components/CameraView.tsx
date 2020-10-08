import React, { Component, useState } from 'react';
import { DataView } from 'primereact/dataview';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { produce } from 'immer'

import { connect } from 'react-redux';
import { getControlPanel } from '../app-redux/actions'

const data = require('../public/products.json').data;
import { tuneIntoFeed, authenticate } from '../app-redux/rtcClient';


interface CameraViewProps {
    fetch: Function
    camera_objects: any[]
    cameras: any[]
    camera_locations: any[]
    sites: any[]
    loading: boolean
    user_id: string
    serverStatus: boolean
    producers: object
    camera_frames: object
    tuneIn: Function
}

interface CameraViewState {
    products: any[]
    layout: string
    sortKey: any
    sortOrder: any
    sortField: any
    displayModel: boolean
    stream: any
    serverStatus: boolean
    producers: string[]
    site_id: string,
    camera_list: string[]
    camera_streams: object
}

class CameraView extends Component<CameraViewProps, CameraViewState> {
    sortOptions: any[] | undefined;

    constructor(props) {
        super(props);
        this.state = {
            products: data,
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            displayModel: false,
            stream: null,
            serverStatus: false,
            producers: [],
            camera_streams: {},
            site_id: '',
            camera_list: []
        };

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' },
        ];

        this.itemTemplate = this.itemTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.closeModel = this.closeModel.bind(this);
    }

    componentDidMount() {
        this.props.fetch()
        authenticate()

    }

    componentWillUnmount = () => {
    }

    componentDidUpdate = () => {
        console.log(this.state);
    }


    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.setState({
                sortOrder: -1,
                sortField: value.substring(1, value.length),
                sortKey: value
            });
        }
        else {
            this.setState({
                sortOrder: 1,
                sortField: value,
                sortKey: value
            });
        }
    }

    openModel(videoObject) {
        console.log(videoObject);

        this.setState({
            displayModel: true,
            stream: videoObject
        })
    }

    closeModel() {
        this.setState({
            displayModel: false,
            stream: null
        })
    }

    renderFooter(name) {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={this.closeModel} className="p-button-text" />
            </div>
        );
    }

    renderGridItem(data) {

        const streamActive = this.state.camera_streams[data.id]

        const setStreamState = (streamState) => {
            this.setState(produce(draft => {
                draft.camera_streams[data.id] = streamState
                if (!draft.camera_list.find(element => element == data.id))
                    draft.camera_list.push(data.id)
                draft.site_id = data.site
                // this.props.tuneIn([...draft.camera_list], draft.site_id, this.props.producers)
            }))
        }

        const streamAvailable = (this.props.serverStatus) &&  (data.id in this.props.producers);

        return (
            <div className="p-col-12 p-md-4  p-lg-4 p-dataview-content" >
                <div className="product-grid-item">
                    <div className="product-grid-item-top">
                        <Tooltip target={`.camera-status-${data.id}`} mouseTrack mouseTrackLeft={10} />
                        <i
                            className={`pi pi-video camera-status-${data.id}`}
                            style={{ fontSize: '1em', color: (streamAvailable) ? 'green' : 'red' }}
                            data-pr-tooltip={
                                (streamAvailable) ? "Camera Online" : "Camera Offline"
                            }
                        >
                        </i>
                        {data.location}
                    </div>
                    <div className="product-grid-item-content">
                        <video
                            id={data.id}
                            className={`live-view-${data.id}`}
                            style={{ width: '200px' }}
                            controls={true}
                            onLoadedData={() => {
                                setStreamState(true)
                            }}
                        />
                        {/* </img> */}
                        <div style={{}} className="p-grid p-nogutter p-align-center">
                            <div style={{ marginRight: '1rem' }} className="p-col-1">
                                <Button
                                    onClick={() => {
                                        tuneIntoFeed([data.id])
                                    }}
                                    style={{ color: 'grey' }}
                                    icon={(streamActive) ? "pi pi-refresh" : "pi pi-eye-slash"}
                                    className="p-button-rounded p-button-text"
                                    tooltip={(streamActive) ? "Stream Unavailable" : "Refresh this Stream"}
                                    tooltipOptions={{ hideDelay: 0, position: 'bottom' }}
                                />
                            </div>
                            <div className="p-col-6">{data.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    itemTemplate(product, layout) {
        if (!product) {
            return null;
        }

        return this.renderGridItem(product);
    }

    renderHeader() {
        return (
            <div
                className="p-grid p-nogutter p-align-center"
            >
                <div className="p-col-11">
                    <h2>Cameras</h2>
                    <small style={{ color: (this.props.serverStatus) ? 'green' : 'red' }}>{(this.props.serverStatus) ? "Connected to Server" : "Connection to Server Lost"}</small>
                </div>
                {/* <div className="p-col-5"> */}
                {/* <small style={{ color: (this.props.serverStatus) ? 'green' : 'red' }}>{(this.props.serverStatus) ? "Connected to Server" : "Connection to Server Lost"}</small> */}
                {/* </div> */}
                <div className="p-col-1">
                    <Button icon="pi pi-refresh" className="p-button-rounded p-button-text"
                        onClick={
                            () => {
                                authenticate();
                                this.props.fetch();
                                tuneIntoFeed(this.props.cameras)
                            }
                        }
                    />
                </div>
            </div>
        );
    }

    render() {
        const header = this.renderHeader();

        // const streamAvailable = (this.state.stream != null) && (this.props.serverStatus) && (this.props.producers[this.state.stream.site]) && (this.props.producers[this.state.stream.site].find(element => element == this.state.stream.id));

        return (
            <div className="dataview-camera-view">
                <DataView
                    className="dataview"
                    value={this.props.camera_objects}
                    layout={this.state.layout}
                    header={header}
                    itemTemplate={this.itemTemplate}
                    paginator
                    rows={6}
                    sortOrder={this.state.sortOrder}
                    sortField={this.state.sortField}
                    alwaysShowPaginator={false}
                />

                {/* <Dialog header={(this.state.stream == null) ? "Stream Not Available" : this.state.stream.name} visible={this.state.displayModel} maximizable modal style={{ width: '80vw', maxWidth: '1700px' }} footer={this.renderFooter('displayMaximizable')} onHide={this.closeModel}>
                    <img
                        className={`live-view-full-screen`}
                        style={{ height: '100%', width: '100%' }}
                        src={
                            (!this.state.displayModel) ?
                                'inactive_black.png'
                                :
                                (!streamAvailable) ?
                                    'static.gif'
                                    :
                                    (this.props.camera_frames[this.state.stream.id] != null && this.props.camera_frames[this.state.stream.id] != '') ?
                                        "data:image/jpeg;base64," + this.props.camera_frames[this.state.stream.id].replace("b'", "").slice(0, -1)
                                        :
                                        'inactive_black.png'
                        }
                    >
                    </img>
                </Dialog> */}
            </div>
        );
    }
}

const mapStoreToProps = (store) => ({
    camera_objects: store.Data.camera_objects,
    cameras: store.Data.cameras,
    user_id: store.Data.user_id,
    camera_locations: store.Data.camera_locations,
    sites: store.Data.sites,
    loading: store.UI.ControlPanel.loading,
    serverStatus: store.Live.status,
    producers: store.Live.producers,
    camera_frames: store.Live.frames
})
const mapDispatchToProps = (dispatch, ownProps) => ({
    fetch: () => dispatch(getControlPanel()),
})

export default connect(
    mapStoreToProps, mapDispatchToProps
)(CameraView);