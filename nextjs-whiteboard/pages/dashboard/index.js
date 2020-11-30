import { useRequireAuth } from '../../hooks/useRequireAuth';
import { useRouter } from 'next/router';
import Button from '../../components/button';
import { useState, useEffect } from 'react';
import Loader from '../../components/loader';
// import GalleryOption from '../components/GalleryOption';
import GalleryForm from '../../components/GalleryForm';
import { auth, db } from '../../config/firebase';
import GalleryOption from '../../components/GalleryOption';
import styles from '../../styles/dashboard.module.css'
// import { useGallery } from '../../hooks/useGallery';
import PopCode from '../../components/PopCode';


export default function Dashboard(props) {
    const auth = useRequireAuth();
    // const gallery = useGallery();
    const router = useRouter();
    const [isCreateGallery, setIsCreateGallery] = useState(false);
    const [isEnterGalleryCode, setIsEnterGalleryCode] = useState(false);
    const [isQueryCode, setIsQueryCode] = useState({state: false, code: null});

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
        if (galleryName == "") {
            alert("Gallery name is required");
            return;
        }
        let postData = { name: galleryName };
        let galleryCode = db.ref().child('galleries').push().key;
        let updates = {};
        updates['/galleries/' + galleryCode] = postData;
        db.ref().update(updates);

        updateUserGalleries(galleryCode, galleryName)
        updateDbUsers(galleryCode, galleryName)

        // Direct to whiteboard page
        // gallery.setGallery({galleryCode, galleryName});
        router.push(`/gallery/${galleryCode}`)
    }

    const enterGalleryCode = (event) => {
        event.preventDefault();
        let galleryCode = event.target.code.value;
        let roomNameRef = db.ref('galleries/' + galleryCode);
        roomNameRef.once('value', (snapshot) =>{
            const data = snapshot.val();
            console.log('this is being called')
            console.log(data)
            if (data == null) {
                alert("The gallery room code is invalid. Please try again.");
                // router.push('/dashboard');
            } else {
                let galleryName = data.name;
                updateDbUsers(galleryCode, galleryName);
                updateUserGalleries(galleryCode, galleryName);
                // gallery.setGallery({galleryCode, galleryName});
                router.push(`/gallery/${galleryCode}`)
            }
        });
    }

    const enterGallery = (event) => {
        let galleryCode = event.target.getAttribute('tabIndex');
        console.log('entergallery called')

        let galleryNameRef = db.ref(`galleries/${galleryCode}/name`);
        galleryNameRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let galleryName = data;
            // gallery.setGallery({galleryCode, galleryName});
        })
        router.push(`/gallery/${galleryCode}`)
    }

    const deleteOption = (event) => {
        event.stopPropagation();
        let galleryCode = event.target.getAttribute('tabIndex');
        if (confirm ("Are you sure to delete this gallery?")) {
            // update user state
            let newUserData = {...auth.user};
            delete newUserData.galleries[galleryCode];
            auth.setUser(newUserData);

            // update to db Users
            let postData = {...auth.user.galleries};
            delete postData[galleryCode];
            let updates = {};
            updates['/users/' + auth.user.uid + '/galleries'] = postData;
            return db.ref().update(updates);  
        } else {
            return;
        }

        
    }

    const galleryNoun = () => {
        if (Object.keys(auth.user.galleries).length != 1) {
            return "galleries";
        } else {
            return "gallery";
        }
    }

    const getCode = (event) => {
        event.stopPropagation();
        setIsQueryCode({state: true, code: event.target.getAttribute('tabIndex')});
    }

    const closePopCode = () => {
        setIsQueryCode({state: false, code: null});
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
                    <GalleryOption key={k} tabIndex={k} name={v} enter={enterGallery} delete={deleteOption}
                    getCode={getCode}/>)})
                    }
                </div>
                
                <div className={styles.circle1}/>
                <div className={styles.circle2}/>
                <div className={styles.circle3}/>
                
                
            </main>

            {isCreateGallery? <GalleryForm title={"Create a New Gallery"} name={"name"} placeholder={"Gallery Name"} 
            submitvalue={"Create"} onSubmit={createGallery} closeGalleryForm={closeGalleryForm}></GalleryForm>: null}

            {isEnterGalleryCode? <GalleryForm title={"Enter a Gallery Code"} name={"code"} placeholder={"Gallery Code"} 
            submitvalue={"Enter"} onSubmit={enterGalleryCode} closeGalleryForm={closeGalleryForm}></GalleryForm>: null}
            
            {isQueryCode.state? <PopCode code={isQueryCode.code} closePopCode={closePopCode}></PopCode>: null}
        </div>
    );
};
