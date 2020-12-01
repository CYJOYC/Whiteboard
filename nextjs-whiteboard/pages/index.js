import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import Button from '../components/Button'
import Popup from '../components/PopUp'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../config/firebase'
import Loader from '../components/Loader'

const TEXTS = [
    'Drawing',
    'Viewing',
    'Sharing',
    'Collaboration'
];

const TextAnimation = dynamic(
  () => import('../components/TextAnimation'),
  { ssr: false }
)

// const io = require('socket.io-client');
// const socket = io('http://localhost:3000');

export default function Index(props) {
    // using hooks to manage sockets
    // const [message, setMessage] = useState('hello');

    // useEffect(() => {
    //     socket.on('now', data => {
    //       setMessage(data.message);
    //       console.log('> message received: ', data.message);
    //     });
    //   }, []); //only re-run the effect if new message comes in
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showSignUpPopup, setShowSignUpPopup] = useState(false);
    const [load, setLoad] = useState(false);

    const showLogin = () => {
        // upon clicking on the Login button, this popup will appear, prompting the user to login
        setShowSignUpPopup(false);
        setShowLoginPopup(true);
    }

    const showSignUp = () => {
        // upon clicking on the Login button, this popup will appear, prompting the user to login
        setShowLoginPopup(false);
        setShowSignUpPopup(true);
    }

    const closePopup = (event) => {
        // hides all popups
        if (event.target.id === "close" || event.target.id === "outer") {
            setShowLoginPopup(false);
            setShowSignUpPopup(false);
        }
    }

    const router = useRouter(); 
    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            if (authUser) router.push('/dashboard');
            else setLoad(true);
        });
    }, []);

    if (!load) return <Loader />;
    return (
       <div className={styles.container}>
            <Head>
                <title>Whiteboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <Button type={'none'} name={'Log In'} onClick={showLogin} />
                    <Button type={'solid'} name={'Sign Up'} onClick={showSignUp} />
                </nav>
            </header>
            <main className={styles.main}>
                <div className={styles.centerpiece}>
                    <h1 className={styles.title}>
                       A Tool for
                    </h1>
                    <div className={styles.textLoop}>
                        <TextAnimation texts={TEXTS} styles={styles}/>
                    </div>
                    <p className={styles.description}>
                       Whiteboard allows users to create their own galleries, where they can unleash their creativity via our drawing functionality and share their creations.
                    </p>
                    <Button type={'solid'} name={'Get Started'} onClick={showSignUp}/>
                </div>
            </main>
            <Image className={styles.background} src="/home-bg.svg" layout="fill"/>
            { showLoginPopup ? <Popup closePopup={closePopup} isLogin={true} signUp={showSignUp} /> : null }
            { showSignUpPopup ? <Popup closePopup={closePopup} isLogin={false} login={showLogin} />  : null }
        </div>
    )
}
