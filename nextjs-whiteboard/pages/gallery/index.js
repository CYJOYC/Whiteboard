import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';

import Gallery from '../../components/Gallery.js';

export default function Project() {
  return <React.StrictMode>
    <Gallery imageUrls={['https://homepages.cae.wisc.edu/~ece533/images/airplane.png', 'https://homepages.cae.wisc.edu/~ece533/images/cat.png', 'https://homepages.cae.wisc.edu/~ece533/images/pool.png']}/>
  </React.StrictMode>
}

