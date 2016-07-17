import React from 'react';
import GalleryLayout from './gallery_layout.js';

var Gallery = React.createClass({
  getInitialState: function(){
    return { gallerySize: this.props.batchSize }
  },
  renderManifest: function(){
    return this.props.manifest.slice(0, this.state.gallerySize);
  },
  incrementGallerySize: function(){
    this.setState({ gallerySize: this.state.gallerySize + 1 });
  },
  render: function(){
    return(
      <GalleryLayout imageLoaded={this.incrementGallerySize} manifest={this.renderManifest()} />
    );
  }
});

export default Gallery;
