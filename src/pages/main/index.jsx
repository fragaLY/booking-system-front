import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import {images} from './images';
import {MainContainer} from './styles';

export class MainPage extends React.Component {
  render() {
    return (
        <MainContainer>
            <ImageGallery lazyLoad={true}
                          showBullets={true}
                          autoPlay={false}
                          slideDuration={2000}
                          items={images}
            />
        </MainContainer>


    )
  }
}
