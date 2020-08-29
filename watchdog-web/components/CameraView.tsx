import React, { Component } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
// import ProductService from '../service/ProductService';
import { Rating } from 'primereact/rating';

const data = require('../public/products.json').data;

export default class CameraView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: data,
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: null
        };

        this.sortOptions = [
            {label: 'Price High to Low', value: '!price'},
            {label: 'Price Low to High', value: 'price'},
        ];

        // this.productService = new ProductService();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
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

    renderListItem(data) {
        return (
            <div className="p-col-12">
                <div className="product-list-item">
                    <img src={`logo.png`} alt={data.name} />
                    <div className="product-list-detail">
                        {/* <div className="product-name">{data.name}</div> */}
                        <div className="product-description">{data.description}</div>
                        {/* <Rating value={data.rating} readonly cancel={false}></Rating> */}
                        {/* <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span> */}
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
            <div className="p-col-6 p-md-6">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        {/* <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.category}</span>
                        </div> */}
                        {/* <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span> */}
                    </div>
                    <div className="product-grid-item-content">
                        <img src={`logo.png`} alt={data.name} />
                        {/* <div className="product-name">{data.name}</div> */}
                        <div className="product-description">{data.description}</div>
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
            return;
        }

        if (layout === 'list')
            return this.renderListItem(product);
        else if (layout === 'grid')
            return this.renderGridItem(product);
    }

    renderHeader() {
        return (
            <div className="p-grid p-nogutter">
                <div className="p-col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={this.sortOptions} value={this.state.sortKey} optionLabel="label" placeholder="Sort By Location" onChange={this.onSortChange}/>
                </div>
                <div className="p-col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={this.state.layout} onChange={(e) => this.setState({ layout: e.value })} />
                </div>
            </div>
        );
    }

    render() {
        const header = this.renderHeader();

        return (
            <div className="dataview-demo">
                <div className="card">
                    <DataView value={this.state.products} layout={this.state.layout} header={header}
                            itemTemplate={this.itemTemplate} paginator rows={6}
                            sortOrder={this.state.sortOrder} sortField={this.state.sortField} alwaysShowPaginator={false}/>
                </div>
            </div>
        );
    }
}
