import React from 'react';
import ImageTile from './image_tile';
import Masonry from 'react-masonry-component';

var Gallery = React.createClass({
  render: function(){
    var images = this.props.manifest.map(function(image, i){
      return(
        <ImageTile imageUrl={image.thumb} downloadUrl={image.full} key={i} /> 
      );
    });
    return (
      <Masonry className="Gallery">
        {images}
      </Masonry>
    );
  }
});

export default Gallery;
