import styles from './galleryoption.module.css'

export default function GalleryOption(props) {
	
    return(
        <div className={styles.container} onClick={props.enter} tabIndex={props.tabIndex}>
            <button onClick={props.delete} className={styles.button} tabIndex={props.tabIndex}> x </button>
            <div className={styles.option}>
            
                <p className={styles.galleryName} tabIndex={props.tabIndex}>{props.name}</p>
            </div>
            <div className={styles.details} tabIndex={props.tabIndex}>
                <span className={styles.title} tabIndex={props.tabIndex}>Enter Gallery</span>
            </div>
        </div>
    ) 
		
}