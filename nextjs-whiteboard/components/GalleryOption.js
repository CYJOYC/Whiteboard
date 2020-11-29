import styles from './galleryoption.module.css';
import Image from 'next/image';


export default function GalleryOption(props) {
	
    return(
        <div className={styles.container} onClick={props.enter} tabIndex={props.tabIndex}>
            <button onClick={props.delete} className={styles.button} tabIndex={props.tabIndex}> x </button>
            <button onClick={props.getCode} className={styles.buttonShare} tabIndex={props.tabIndex}> 
                <Image className={styles.icon} onClick={props.getCode} tabIndex={props.tabIndex} src="/share.png" layout="fill"/>
            </button>
            <div className={styles.option} tabIndex={props.tabIndex}>
                <p className={styles.galleryName} tabIndex={props.tabIndex} >{props.name}</p>
            </div>
            <div className={styles.details} tabIndex={props.tabIndex} >
                <span className={styles.title} tabIndex={props.tabIndex}>Enter Gallery</span>
            </div>
        </div>
    ) 
		
}