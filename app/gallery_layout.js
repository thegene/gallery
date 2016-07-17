import React from 'react';
import ImageTile from './image_tile';

import Masonry from 'react-masonry-component';

var GalleryLayout = React.createClass({
  render: function(){
    var lastImg = this.props.manifest.length -1;
    var images = this.props.manifest.map(function(image, i){

      var onLoad = {};
      if (i == lastImg){
        onLoad = { onLoad: this.props.imageLoaded};
      }

      return(
        <ImageTile
          key={i}
          thumb={image.thumb}
          full={image.full}
          {...onLoad}
        /> 
      );
    }.bind(this));

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
