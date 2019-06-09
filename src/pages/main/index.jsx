import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import {images} from './images';

export class MainPage extends React.Component {
  render() {
    return (
        <ImageGallery showBullets={true}
                      autoPlay={true}
                      slideDuration={3000}
                      items={images} />
    )
  }
}