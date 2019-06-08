import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import {brickImages} from './brickImages';
import {woodenImages} from './woodenImages';

export class HousesPage extends React.Component {
    render() {
        return (
            <ImageGallery name='brick-house' items={brickImages}/>
            // <ImageGallery name='wooden-house' items={woodenImages}/>
        )
    }
}
