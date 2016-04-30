import Gallery from './gallery';
import React from 'react';
import ReactDOM from 'react-dom';
import manifest from '../config/manifest.json';

ReactDOM.render(
  <Gallery manifest={manifest.manifest} />,
  document.getElementById('content')
);