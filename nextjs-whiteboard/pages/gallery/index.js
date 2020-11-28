import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import { auth, db } from '../../config/firebase';
import { useState, useEffect } from 'react';
import Gallery from '../../components/Gallery.js';

export default function Project() {
  
  let data = []; 
  var picturesRef = db.ref("galleries/" + "0000" + "/pictures");
  
  let json = {}
  picturesRef.on("value", function(snapshot) {
    console.log(snapshot.val());
    json = snapshot.val();
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });  

  for (let element in json) {
    data.push(json[element]['imageURL'])
  }
  
  console.log(data)

  return <React.StrictMode>
    <Gallery imageUrls={data}/>
  </React.StrictMode>
}

