import { useRequireAuth } from '../hooks/useRequireAuth';
import { useRouter } from 'next/router';
import Button from '../components/button';
import { useState, useEffect } from 'react';
import Loader from '../components/loader';
// import GalleryOption from '../components/GalleryOption';
import GalleryForm from '../components/GalleryForm';
import { auth, db } from '../config/firebase';
import GalleryOption from '../components/GalleryOption';
import styles from '../styles/dashboard.module.css'

export default function Dashboard(props) {
    const auth = useRequireAuth();
    const [isCreateGallery, setIsCreateGallery] = useState(false);
    const [isEnterGalleryCode, setIsEnterGalleryCode] = useState(false);

    const closeGalleryForm = () => {
        setIsCreateGallery(false);
        setIsEnterGalleryCode(false);
    }

    const showCreateGallery = () => {
        setIsCreateGallery(true);
        setIsEnterGalleryCode(false);
    }

    const showEnterGalleryCode = () => {
        setIsEnterGalleryCode(true);
        setIsCreateGallery(false);
    }

    const updateUserGalleries = (newPostKey, galleryName) => {
        let newUserData = {...auth.user};
        newUserData.galleries = {...newUserData.galleries, [newPostKey]: galleryName};
        auth.setUser(newUserData);
    }

    const updateDbUsers = (newPostKey, galleryName) => {
        let postData = {...auth.user.galleries, [newPostKey]: galleryName};
        let updates = {};
        updates['/users/' + auth.user.uid + '/galleries'] = postData;
        return db.ref().update(updates);     
    }

    const createGallery = (event) => {
        event.preventDefault();
        let galleryName = event.target.name.value;
        let postData = { name: galleryName };
        let newPostKey = db.ref().child('galleries').push().key;
        let updates = {};
        updates['/galleries/' + newPostKey] = postData;
        db.ref().update(updates);

        updateUserGalleries(newPostKey, galleryName)
        updateDbUsers(newPostKey, galleryName)

        // Direct to whiteboard page

    }

    const enterGalleryCode = (event) => {
        event.preventDefault();
        let roomCode = event.target.code.value;
        let roomNameRef = db.ref('galleries/' + roomCode);
        roomNameRef.on('value', (snapshot) =>{
            const data = snapshot.val();
            console.log(data)
            let galleryName = data.name;
            updateDbUsers(roomCode, galleryName);
            updateUserGalleries(roomCode, galleryName);
        });

        // Direct to whiteboard page

    }

    const enterGallery = (event) => {
        let roomCode = event.target.getAttribute('tabIndex');
        console.log("parent div")
        // Direct to whiteboard page
    }

    const deleteOption = (event) => {
        event.stopPropagation();
        let roomCode = event.target.getAttribute('tabIndex');
        alert("Are you sure to delete?");

        // update user state
        let newUserData = {...auth.user};
        delete newUserData.galleries[roomCode];
        auth.setUser(newUserData);

        // update to db Users
        let postData = {...auth.user.galleries};
        delete postData[roomCode];
        let updates = {};
        updates['/users/' + auth.user.uid + '/galleries'] = postData;
        return db.ref().update(updates);  
    }
    const galleryNoun = () => {
        if (Object.keys(auth.user.galleries).length != 0) {
            return "galleries";
        } else {
            return "gallery";
        }
    }

    if (!auth.user || !auth.user.name) return <Loader />;
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <Button onClick={showCreateGallery} type={'solid'} name={'Create New Gallery'} />
                    <Button onClick={showEnterGalleryCode} type={'solid'} name={'Enter Gallery Code'} />
                    <Button onClick={auth.signOut} type={'outline'} name={'Logout'} />
                </nav>
            </header>
            <main className={styles.main}>
                <h1>Welcome {auth.user.name}!</h1>
                <h3>You are logged in with {auth.user.email} and have {Object.keys(auth.user.galleries).length} {galleryNoun()}.</h3>
                <div className={styles.galleryOptions}>
                    {Object.entries(auth.user.galleries).map(([k, v]) => {return (
                    <GalleryOption key={k} tabIndex={k} name={v} enter={enterGallery} delete={deleteOption}/>)})
                    }
                </div>
            </main>

            {isCreateGallery? <GalleryForm title={"Create a New Gallery"} name={"name"} placeholder={"Board Name"} 
            submitvalue={"Create"} onSubmit={createGallery} closeGalleryForm={closeGalleryForm}></GalleryForm>: null}

            {isEnterGalleryCode? <GalleryForm title={"Enter a Gallery Code"} name={"code"} placeholder={"Board Code"} 
            submitvalue={"Enter"} onSubmit={enterGalleryCode} closeGalleryForm={closeGalleryForm}></GalleryForm>: null}
            
        </div>
    );
};
