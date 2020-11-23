import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import Button from '../components/button'
import React, {useState, useEffect} from 'react';

const TEXTS = [
    'Drawing',
    'Editing',
    'Communication',
    'Collaboration'
];

const TextAnimation = dynamic(
  () => import('../components/TextAnimation'),
  { ssr: false }
)

const io = require('socket.io-client');
const socket = io('http://localhost:3000');

export default function Home() {
    // using hooks to manage sockets
    const [message, setMessage] = useState('hello');

    useEffect(() => {
        socket.on('now', data => {
          setMessage(data.message);
          console.log('> message received: ', data.message);
        });
      }, []); //only re-run the effect if new message comes in
    return (
        <div className={styles.container}>
            <Head>
                <title>Whiteboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <Button type={'none'} name={'Log In'}/>
                    <Button type={'solid'} name={'Sign Up'}/>
                </nav>
            </header>
            <main className={styles.main}>
                <div className={styles.centerpiece}>
                    <h1>{message}</h1>
                    <h1 className={styles.title}>
                       A Tool for
                    </h1>
                    <div className={styles.textLoop}>
                        <TextAnimation texts={TEXTS} styles={styles}/>
                    </div>
                    <p className={styles.description}>
                       Whiteboard provides Editing, Viewing, and Presenting modes for individuals and teams to convey ideas.
                    </p>
                    <Button type={'solid'} name={'Get Started'}/>
                </div>
            </main>
            <Image className={styles.background} src="/home-bg.svg" layout="fill"/>
        </div>
    )
}
