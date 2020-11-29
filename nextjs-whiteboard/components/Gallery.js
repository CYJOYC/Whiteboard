import React, { useState, useEffect } from "react";
import { db } from '../config/firebase';
import styles from './gallery.module.css';
import Button from '../components/button';
import { useRouter } from 'next/router';

function Gallery(props) {

  const [imageURLs, setimageURLs] = useState([]);
  const galleryCode = "0000";
  const router = useRouter();

  var picturesRef = db.ref(`galleries/${galleryCode}/pictures`);
  
  let json = {}
  picturesRef.on("value", function(snapshot) {
    json = snapshot.val();

    let test = []
    for (let element in json) {
      test.push(json[element])
    }
    
    if (!arraysEqual(test, imageURLs)) {
      setimageURLs(test)
    }
      // for (let element in json) {
      //   if (!(imageURLs.includes(json[element]['imageURL']))) {
      //     let arrayClone = [...imageURLs]
      //     setimageURLs(arrayClone.push(json[element]['imageURL']))
      //   }
      // }
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });  

  // let imageURLs = ['https://homepages.cae.wisc.edu/~ece533/images/fruits.png','https://homepages.cae.wisc.edu/~ece533/images/peppers.png']
  
  function arraysEqual(a1,a2) {
    return JSON.stringify(a1)==JSON.stringify(a2);
  }

  function renderImage(imageUrl) {
    return (
      <div className={styles.card}>
        <img src={imageUrl['imageURL']} />
        <figcaption>Created by {imageUrl['creator']}</figcaption>
      </div>
    );
  }

  function createBoard() {
    router.push({
      pathname: 'whiteboard',
      query: { galleryCode: galleryCode }
    });
  }
 
  return (
    <div>
      <div className={styles.title}>
        Gallery Room {galleryCode}
      </div>
      <div className={styles.newBoardBtn}>
        <Button type={'solid'} name={'New Drawing'} onClick={createBoard} />
      </div>
      <div className={styles.gallery}>
        <div className={styles.images}>
          {imageURLs.map(imageUrl => renderImage(imageUrl))}
        </div>
      </div>
    </div>
  );

}

export default Gallery;
