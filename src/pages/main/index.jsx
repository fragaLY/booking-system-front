import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import {images} from './images';

export class MainPage extends React.Component {
  render() {
    return (
        <ImageGallery lazyLoad={true}
                      showBullets={true}
                      autoPlay={false}
                      slideDuration={2000}
                      items={images} />
    )
  }
}
