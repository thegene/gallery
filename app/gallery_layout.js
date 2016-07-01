import React from 'react';
import ImageTile from './image_tile';

import Masonry from 'react-masonry-component';

var GalleryLayout = React.createClass({
  render: function(){
    var images = this.props.manifest.map(function(image, i){
      return(
        <ImageTile
          key={i}
          imageUrl={image.thumb}
          downloadUrl={image.full}
        /> 
      );
    });

    return (
      <Masonry
        className={'Gallery'}
      >
        {images}
      </Masonry>
    );
  }
});

export default GalleryLayout;
