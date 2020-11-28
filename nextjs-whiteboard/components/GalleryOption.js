import styles from './galleryoption.module.css'

export default function GalleryOption(props) {
	
    return(
        <div className={styles.option} onClick={props.enter} tabIndex={props.tabIndex}>
            <button onClick={props.delete} className={styles.button} tabIndex={props.tabIndex}> x </button>
            <p className={styles.galleryName} tabIndex={props.tabIndex}>{props.name}</p>
        </div>
    ) 
		
}