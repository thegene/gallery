import React from 'react';
import GalleryLayout from './gallery_layout.js';

var Gallery = React.createClass({
  getInitialState: function(){
    return { gallerySize: 1 }
  },
  renderManifest: function(){
    return this.props.manifest.slice(0, this.state.gallerySize);
  },
  incrementGallerySize: function(){
    this.setState({ gallerySize: this.state.gallerySize + 1 });
  },
  componentDidMount: function(){
    setInterval(function(){
      this.incrementGallerySize();
    }.bind(this), 3000);
  },
  render: function(){
    return(
      <GalleryLayout manifest={this.renderManifest()} />
    );
  }
});

export default Gallery;
