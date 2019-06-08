import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import {brickImages} from './brickImages';
import {woodenImages} from './woodenImages';

export class HousesPage extends React.Component {
    render() {
        return (
            <React.Fragment>
            <ImageGallery lazyLoad={true}
                          showBullets={true}
                          name='brick-house'
                          items={brickImages}
            />
            <ImageGallery name='wooden-house'
                          lazyLoad={true}
                          showBullets={true}
                          name='brick-house'
                          items={woodenImages}
            />
            </React.Fragment>
        )
    }
}
