import React from 'react';

var ImageTile = React.createClass({
  render: function(){
    return (
      <div className="ImageTile">
        <img src={this.props.imageUrl} />
      </div>
    );
  }
});

export default ImageTile;
