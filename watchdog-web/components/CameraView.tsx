import React, { Component } from 'react';
import {DataView} from 'primereact/dataview';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';

import { connect } from 'react-redux';
import { getControlPanel } from '../app-redux/actions'

const data = require('../public/products.json').data;

interface CameraViewProps {
    fetch: Function
    camera_objects: any[]
    cameras: any[]
    camera_locations: any[]
    sites: any[]
    loading: boolean
}
interface CameraViewState {
    products: any[]
    layout: string
    sortKey: any
    sortOrder: any
    sortField: any
    displayModel: boolean
    stream: any
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
            stream: null
        };

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' },
        ];

        // this.productService = new ProductService();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.closeModel = this.closeModel.bind(this);
    }

    componentDidMount() {
        // this.productService.getProducts().then(data => this.setState({ products: data }));
        // this.setState({
        // products: data
        // })
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
                {/* <img className='' style={{ height: '100%', width: '100%' }} src={'static.gif'}></img> */}
                <Button label="Cancel" icon="pi pi-times" onClick={this.closeModel} className="p-button-text" />
            </div>
        );
    }

    renderGridItem(data) {
        return (
            <div className="p-col-4 p-md-4 p-dataview-content" >
                <div className="product-grid-item">
                    <div className="product-grid-item-top">
                        <small className="p-text-light">Location</small>
                        <Tooltip target={`.camera-status-${data.id}`} mouseTrack mouseTrackLeft={10} />
                        <i className={`pi pi-video camera-status-${data.id}`} style={{ fontSize: '1em', color: 'red' }} data-pr-tooltip="Camera Offline"></i>
                    </div>
                    <div className="product-grid-item-content">
                        <img className={`live-view-${data.id}`} style={{ height: '100%', width: '100%' }} src={'static.gif'} onClick={() => this.openModel(data)}></img>
                        <div style={{}} className="p-grid p-nogutter p-align-center">
                            <div style={{marginRight: '1rem'}} className="p-col-1">
                                <Button style={{ color: 'grey' }} icon="pi pi-eye-slash" className="p-button-rounded p-button-text" tooltip="Disable Viewing of Camera" tooltipOptions={{hideDelay: 0, position: 'bottom'}}/>
                            </div>
                            <div className="p-col-6">Camera X</div>
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
                <div className="p-col-6" style={{ textAlign: 'left' }}>
                    <h2>Cameras</h2>
                </div>
                <div className="p-col-6" style={{ textAlign: 'right' }}>
                    <Dropdown style={{ testAlign: 'left' }} options={this.sortOptions} value={this.state.sortKey} optionLabel="label" placeholder="Sort By Location" onChange={this.onSortChange} />
                </div>
            </div>
        );
    }

    render() {
        const header = this.renderHeader();

        return (
            <div className="dataview-camera-view">
                <DataView
                    className="dataview"
                    value={this.state.products}
                    layout={this.state.layout}
                    header={header}
                    itemTemplate={this.itemTemplate}
                    paginator
                    rows={6}
                    sortOrder={this.state.sortOrder}
                    sortField={this.state.sortField}
                    alwaysShowPaginator={false}
                />

                <Dialog header={(this.state.stream == null) ? "Stream Not Available" : this.state.stream.name} visible={this.state.displayModel} maximizable modal style={{ width: '50vw' }} footer={this.renderFooter('displayMaximizable')} onHide={this.closeModel}>
                    <img className='' style={{ height: '100%', width: '100%' }} src={'static.gif'}></img>
                </Dialog>

            </div>
        );
    }
}

const mapStoreToProps = (store) => ({
    camera_objects: store.Data.camera_objects,
    cameras: store.Data.cameras,
    camera_locations: store.Data.camera_locations,
    sites: store.Data.sites,
    loading: store.UI.ControlPanel.loading
})
const mapDispatchToProps = (dispatch) => ({
    fetch: () => dispatch(getControlPanel())
})

export default connect(
    mapStoreToProps, mapDispatchToProps
)(CameraView);