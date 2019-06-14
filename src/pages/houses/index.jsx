import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import 'bootstrap/dist/css/bootstrap.css';

import {brickImages} from './brickImages';
import {woodenImages} from './woodenImages';
import {
    BrickGalleryWrapper,
    GalleryWrapper,
    WoodenGalleryWrapper
} from "./styles";

export class HousesPage extends React.Component {
    render() {
        return (
            <GalleryWrapper>
                <BrickGalleryWrapper>
                    <ImageGallery showBullets={true}
                                  name='brick-house'
                                  items={brickImages}
                    />
                </BrickGalleryWrapper>
                <WoodenGalleryWrapper>
                    <ImageGallery showBullets={true}
                                  name='wooden-house'
                                  items={woodenImages}
                    />
                </WoodenGalleryWrapper>
            </GalleryWrapper>
        )
    }
}
