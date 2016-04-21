import React from 'react';

var ImageTile = React.createClass({
  render: function(){
    return (
      <div className="ImageTile">
        <a href={this.props.downloadUrl} download="true" target="_blank">
          <img src={this.props.imageUrl} />
        </a>
      </div>
    );
  }
});

export default ImageTile;
