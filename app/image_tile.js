import React from 'react';

var ImageTile = React.createClass({
  render: function(){
    return (
      <div className="ImageTile">
        <a download="true" target="_blank">
          <img src={this.props.imageUrl} />
        </a>
      </div>
    );
  }
});

export default ImageTile;
