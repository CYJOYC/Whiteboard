import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import { auth, db } from '../../config/firebase';
import { useState, useEffect } from 'react';
import Gallery from '../../components/Gallery.js';

export default function Project() {
  


  

  return <React.StrictMode>
    <Gallery/>
  </React.StrictMode>
}

