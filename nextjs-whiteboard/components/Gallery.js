import React, { useState, useEffect } from "react";
import styles from './gallery.module.css';
import Button from '../components/button';
import { useRouter } from 'next/router';
import Loader from '../components/loader';

function arraysEqual(a1,a2) {
  return JSON.stringify(a1)==JSON.stringify(a2);
}

function Gallery(props) {
  const [imageURLs, setimageURLs] = useState([]);
  const router = useRouter();
  let galleryName = props.data.name;
  let galleryCode = props.code;
  let picturesTemp = []
  for (let element in props.data.pictures) {
    picturesTemp.push(props.data.pictures[element])
  }
  
  if (!arraysEqual(picturesTemp, imageURLs)) {
    setimageURLs(picturesTemp)
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
      pathname: '/whiteboard',
      query: { galleryCode: galleryCode }
    });
  }

  
  
  return (
    <div>
      <div className={styles.title}>
        Gallery Room {galleryName}
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



