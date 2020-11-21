import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import Button from '../components/button'

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

export default function Home() {
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
