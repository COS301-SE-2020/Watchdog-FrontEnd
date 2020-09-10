import React, { Component } from 'react';
import { Galleria } from 'primereact/galleria';

interface PhotoGslleryProps {
    images: any[]
    onUpdateActiveIndex: Function
    activeIndex: number
} 

interface PhotoGalleryState {

}

export class PhotoGallery extends Component<PhotoGslleryProps, PhotoGalleryState> {
    responsiveOptions: { breakpoint: string; numVisible: number; }[];

    constructor(props) {
        super(props);

        // this.state = {
            // images: null
        // };

        // this.galleriaService = new PhotoService();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.thumbnailTemplate = this.thumbnailTemplate.bind(this);
        this.caption = this.caption.bind(this);

        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
    }

    componentDidMount() {
        // this.galleriaService.getImages().then(data => this.setState({ images: data }));
    }

    itemTemplate(item) {
        return <img src={item.img} alt={item.name} style={{ width: '100%', display: 'block' }} />;
    }

    thumbnailTemplate(item) {
        return <img src={item.img} alt={item.name} style={{ display: 'block', width: '50px', height: '50px' }} />;
    }

    caption(item) {
        return (
            <>
                <h4 className="p-mb-2">{item.name}</h4>
                {/* <p>{item.alt}</p> */}
            </>
        );
    }

    render() {
        return (
            <div>
                <div className="card">
                    <Galleria value={this.props.images} responsiveOptions={this.responsiveOptions} numVisible={5}
                        item={this.itemTemplate} thumbnail={this.thumbnailTemplate}
                        caption={this.caption} style={{ maxWidth: '640px' }} activeIndex={this.props.activeIndex} onItemChange={(e) => this.props.onUpdateActiveIndex(e)} />
                </div>
            </div>
        );
    }
}