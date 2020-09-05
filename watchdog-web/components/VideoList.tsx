import React, { Component } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';

import ReactPlayer from 'react-player/lazy'
import moment from 'moment';

// const data = require('../public/products.json').data;

interface VideoListProps {
    videos: any[],
    locations: object
    onPlay: Function
    fetch: Function
}

interface VideoListState {
    products: any[]
    layout: string
    sortKey: string
    sortOrder: number
    sortField: string
}

class VideoList extends Component<VideoListProps, VideoListState> {
    sortOptions: { label: string; value: string; }[];

    constructor(props) {
        super(props);
        this.state = {
            products: this.props.videos,
            layout: 'grid',
            sortKey: '',
            sortOrder: 1,
            sortField: ''
        };

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' },
        ];

        this.itemTemplate = this.itemTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
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

    renderListItem(data) {
        return (
            <div className="p-col-12" onClick={() => this.props.onPlay(data)}>
                <div className="product-list-item">
                    <ReactPlayer
                        url={data.path_in_s3}
                        playing={false}
                        className="thumbnail"
                        width={'200px'}
                        height={'100%'}
                    />
                    <div className="product-list-detail">
                        <div className="product-name">{moment.unix(data.metadata.timestamp).format("DD-MM-YYYY hh:mm:ss")}</div>
                        <div className="product-description">{(this.props.locations[data.metadata.camera_id])? this.props.locations[data.metadata.camera_id]:"Unknown Location"}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.tag}</span>
                    </div>
                </div>
            </div>
        );
    }

    renderGridItem(data) {
        return (
            <div className="p-col-12 p-md-4" onClick={() => this.props.onPlay(data)}>
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.tag}</span>
                        </div>
                    </div>
                    <div className="product-grid-item-content">
                        <ReactPlayer
                            url={data.path_in_s3}
                            playing={false}
                            className="thumbnail"
                            width={'200px'}
                            height={'100%'}
                        />
                        <div className="product-name">{moment.unix(data.metadata.timestamp).format("DD-MM-YYYY hh:mm:ss")}</div>
                        <div className="product-description">{(this.props.locations[data.metadata.camera_id])? this.props.locations[data.metadata.camera_id]:"Unknown Location"}</div>
                    </div>
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
                    {/* <Dropdown options={this.sortOptions} value={this.state.sortKey} optionLabel="label" placeholder="Sort By Price" onChange={this.onSortChange}/> */}
                    {/* <p style={{marginTop: '0.5rem'}}>Recordings</p> */}
                    <Button icon="pi pi-refresh" className="p-button-rounded p-button-text" onClick={this.props.fetch}/>
                </div>
                <div className="p-col-6" style={{ textAlign: 'right' }}>
                    <DataViewLayoutOptions layout={this.state.layout} onChange={(e) => this.setState({ layout: e.value })} />
                </div>
            </div>
        );
    }

    render() {
        const header = this.renderHeader();

        return (
            <div className="dataview-video-list">
                <div className="card">
                    <DataView value={this.props.videos} layout={this.state.layout} header={header}
                        itemTemplate={this.itemTemplate} paginator rows={6}
                        sortOrder={this.state.sortOrder} sortField={this.state.sortField} />
                </div>
            </div>
        );
    }
}

export default VideoList;