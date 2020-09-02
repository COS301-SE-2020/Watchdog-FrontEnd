import React, { Component } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
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
    video: any
}

class CameraView extends Component<CameraViewProps, CameraViewState> {

    constructor(props) {
        super(props);
        this.state = {
            products: data,
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            displayModel: false,
            video: null
        };

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' },
        ];

        // this.productService = new ProductService();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.openModel = this.openModel.bind(this);
        this.closeModel = this.closeModel.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
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
            video: videoObject
        })
    }

    closeModel() {
        this.setState({
            displayModel: false,
            video: null
        })
    }

    renderFooter(name) {
        return (
            <div>
                <Button label="Cancel" icon="pi pi-times" onClick={this.closeModel} className="p-button-text" />
                {/* <Button label="Yes" icon="pi pi-check" onClick={() => this.onHide(name)} autoFocus /> */}
            </div>
        );
    }

    renderListItem(data) {
        return (
            <div className="p-col-6 p-md-12 p-lg-12 p-dataview-content" >
                <div className="product-list-item" onClick={() => this.openModel(data)}>
                    {/* <img src={`logo.png`} alt={data.name} /> */}
                    <i className="pi pi-video" style={{ fontSize: '2em', color: 'green' }}></i>
                    <div className="product-list-detail">
                        {/* <div className="product-name">{data.name}</div> */}
                        <div className="product-description">Camera X</div>
                        {/* <Rating value={data.rating} readonly cancel={false}></Rating> */}
                        {/* <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span> */}
                        <small className="p-text-light">Location</small>
                    </div>
                    {/* <div className="product-list-action"> */}
                    {/* <span className="product-price">${data.price}</span> */}
                    {/* <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                    {/* <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span> */}
                    {/* </div> */}
                </div>
            </div>
        );
    }

    renderGridItem(data) {
        return (
            <div className="p-col-4 p-md-4 p-dataview-content" >
                <div className="product-grid-item" onClick={() => this.openModel(data)}>
                    <div className="product-grid-item-top">
                        <small className="p-text-light">Location</small>
                    </div>
                    <div className="product-grid-item-content" >
                        {/* <img src={`logo.png`} alt={data.name} /> */}
                        <i className="pi pi-video" style={{ fontSize: '2em', color: 'red' }}></i>
                        {/* <div className="product-name">{data.name}</div> */}
                        <div className="product-description">Camera X</div>
                        {/* <Rating value={data.rating} readonly cancel={false}></Rating> */}
                    </div>
                    {/* <div className="product-grid-item-bottom">
                        <span className="product-price">${data.price}</span>
                        <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                    </div> */}
                </div>
            </div>
        );
    }

    itemTemplate(product, layout) {
        if (!product) {
            return null;
        }

        if (layout === 'list')
            return this.renderListItem(product);
        else if (layout === 'grid')
            return this.renderGridItem(product);
    }

    renderHeader() {
        return (
            <div className="p-grid p-nogutter">
                <div className="p-col-6" style={{ textAlign: 'left' }}>
                    <h2>Cameras</h2>
                    <Dropdown options={this.sortOptions} value={this.state.sortKey} optionLabel="label" placeholder="Sort By Location" onChange={this.onSortChange} />
                </div>
                <div className="p-col-6" style={{ textAlign: 'right' }}>
                    <DataViewLayoutOptions layout={this.state.layout} onChange={(e) => this.setState({ layout: e.value })} />
                </div>
            </div>
        );
    }

    componentDidMount = () => {
        this.props.fetch()
    }

    render() {
        const header = this.renderHeader();

        return (
            <div className="dataview-demo">
                {/* <div className="card"> */}
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
                {/* </div> */}

                <Dialog header="Header" visible={this.state.displayModel} maximizable modal style={{ width: '50vw' }} footer={this.renderFooter('displayMaximizable')} onHide={this.closeModel}>
                    {(this.state.video == null) ? "Video Not Available" : this.state.video.name}
                    {/* <ReactPlayer
                        ref={this.ref}
                        className='react-player'
                        width='100%'
                        height='100%'
                        url={url}
                        pip={pip}
                        playing={playing}
                        controls={controls}
                        light={light}
                        loop={loop}
                        playbackRate={playbackRate}
                        volume={0.0}
                        muted={muted}
                        onReady={() => console.log('onReady')}
                        onStart={() => console.log('onStart')}
                        onPlay={this.handlePlay}
                        onPause={this.handlePause}
                        onBuffer={() => console.log('onBuffer')}
                        onSeek={e => console.log('onSeek', e)}
                        onEnded={this.handleEnded}
                        onError={e => console.log('onError', e)}
                        onProgress={this.handleProgress}
                        onDuration={this.handleDuration}

                    /> */}
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