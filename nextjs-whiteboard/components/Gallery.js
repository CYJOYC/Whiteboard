import React, { useState, useEffect } from "react";
import styles from './gallery.module.css';
import Button from '../components/button';
import { useRouter } from 'next/router';
import { useGallery } from '../hooks/useGallery';
import Loader from '../components/loader';
import Modal from 'react-modal';
import CommentsBlock from './Comments/CommentsBlock.js';
import { useAuth } from '.././hooks/useAuth';

function arraysEqual(a1,a2) {
  return JSON.stringify(a1)==JSON.stringify(a2);
}

function Gallery(props) {
  const auth = useAuth();
  const [imageURLs, setimageURLs] = useState([]);
  const router = useRouter();
  // const gallery = useGallery();
  // if (!gallery.gallery ) return <Loader />;
  // const galleryCode = router.query.id;
  let galleryName = props.data.name;
  let picturesTemp = [];
  for (let element in props.data.pictures) {
    let image = props.data.pictures[element];
    image['picId'] = element;
    picturesTemp.push(image)
  }

  if (!arraysEqual(picturesTemp, imageURLs)) {
    setimageURLs(picturesTemp)
  }

  function renderImage(imageUrl) {
    return (
      <div className={styles.card}>
        <img src={imageUrl['imageURL']}/>
        <figcaption>Created by {imageUrl['creator']}</figcaption>
        <CommentsBlock comments={imageUrl['comments']} user={auth.user.name} picId={imageUrl['picId']}/>
      </div>
    );
  }


  function createBoard() {
    router.push({
      pathname: '/whiteboard',
      query: { galleryCode: galleryCode }
    });
  }

  function backToDashboard() {
    router.push('/dashboard');
  }

  
  if (!auth.user || !auth.user.name) return <Loader />;
  return (
    <div>
      <div className={styles.backToDashboardBtn}>
        <Button type={'outline'} name={'Back to Dashboard'} onClick={backToDashboard} />
      </div>
      <div className={styles.title}>
        Gallery Room {galleryName}
      </div>
      <div className={styles.newBoardBtn}>
        <Button type={'solid'} name={'New Drawing'} onClick={createBoard} />
      </div>
      <div className={styles.gallery}>
        <div className={styles.images}>
          {imageURLs.map((imageUrl) => renderImage(imageUrl))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;



