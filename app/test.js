import ReactDOM from 'react-dom';
import React from 'react';

var Test = React.createClass({
  render: function(){
    return (
      <div>sup?</div>
    );
  }
});

ReactDOM.render(
  <Test />,
  document.getElementById('content')
);
