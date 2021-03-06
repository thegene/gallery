import React from 'react';

var ImageTile = React.createClass({
  render: function(){
    return (
      <div className="ImageTile">
        <a href={this.props.full} target="_blank">
          <img src={this.props.thumb} onLoad={this.props.onLoad} />
        </a>
      </div>
    );
  }
});

export default ImageTile;
