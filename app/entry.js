import Gallery from './gallery';
import React from 'react';
import ReactDOM from 'react-dom';
import manifest from '../config/manifest.json';

import './stylesheet.scss';

ReactDOM.render(
  <Gallery manifest={manifest.manifest} batchSize={10} />,
  document.getElementById('content')
);
