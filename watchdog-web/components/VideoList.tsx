import React, { Component } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';

import ReactPlayer from 'react-player/lazy'
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars'

// const data = require('../public/products.json').data;

interface VideoListProps {
    videos: any[],
    locations: object
    onPlay: Function
    fetch: Function
    filter: Function
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
                        url={data.url}
                        playing={false}
                        className="thumbnail"
                        width={'200px'}
                        height={'100%'}
                    />
                    <div className="product-list-detail">
                        <div className="p-col-12 p-md-12 p-lg-12 product-name">{data.date}</div>
                        <div className="p-col-12 p-md-12 p-lg-12 product-name">{data.time}</div>
                        <div className="p-col-12 p-md-12 p-lg-12 product-description">{data.location || "Unknown Location"}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.type}</span>
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
                            <span className="product-category">{data.type}</span>
                        </div>
                    </div>
                    <div className="product-grid-item-content">
                        <div className="p-grid">
                            <div style={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='p-col-12 p-md-12 p-lg-12'>
                                <ReactPlayer

                                    url={data.url}
                                    playing={false}
                                    className="thumbnail"
                                    width={'200px'}
                                    height={'100%'}
                                />
                            </div>
                        </div>
                        <div className="p-col-12 p-md-12 p-lg-12 product-name">{data.date}</div>
                        <div className="p-col-12 p-md-12 p-lg-12 product-name">{data.time}</div>
                        <div className="p-col-12 p-md-12 p-lg-12 product-description">{data.location || "Unknown Location"}</div>
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
                    <Button icon="pi pi-refresh" className="p-button-rounded p-button-text" onClick={this.props.fetch} />
                    <Button icon="pi pi-filter" className="p-button-rounded p-button-text" onClick={()=>this.props.filter()} />
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
            <Scrollbars style={{height : '85vh'}} className="dataview-video-list">
                <div className="card">
                    <DataView value={this.props.videos} layout={this.state.layout} header={header}
                        itemTemplate={this.itemTemplate} paginator rows={6}
                        paginatorPosition = 'both'
                        sortOrder={this.state.sortOrder} sortField={this.state.sortField} />
                </div>
            </Scrollbars>
        );
    }
}

export default VideoList;