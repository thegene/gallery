import React from 'react';
import ImageTile from './image_tile';

var Gallery = React.createClass({
  render: function(){
    var images = this.props.manifest.map(function(image, i){
      return(
        <ImageTile imageUrl={image.thumb} downloadUrl={image.full} key={i} /> 
      );
    });
    return (
      <div className="Gallery">
        {images}
      </div>
    );
  }
});

export default Gallery;
