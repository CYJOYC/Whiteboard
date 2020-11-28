import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import { auth, db } from '../../config/firebase';
import { useState, useEffect } from 'react';
import Gallery from '../../components/Gallery.js';

export default function Project() {
  
  let data = ''; 
  db.ref('galleries/' + '0000' + 'testImage').on('value', (snapshot) => {
    data = snapshot.val();
  })

  const [blobUrl, setBlobUrl] = useState(''); // initial src will be empty

  useEffect(() => {
    var binaryData = [];
    binaryData.push(data);
    
    setBlobUrl(URL.createObjectURL(new Blob(binaryData, {type: "application/zip"})))
  }, []);

  return <React.StrictMode>
    <Gallery imageUrls={[blobUrl, 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png', 'https://homepages.cae.wisc.edu/~ece533/images/cat.png', 'https://homepages.cae.wisc.edu/~ece533/images/pool.png']}/>
  </React.StrictMode>
}

