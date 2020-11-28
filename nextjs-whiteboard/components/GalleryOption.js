import styles from './galleryoption.module.css'

export default function GalleryOption(props) {
	
    return(
        <div className={styles.option} onClick={props.onClick}>
            <button onClick={props.deleteGallery} className={styles.button}> x </button>
            <p className={styles.galleryName}>{props.name}</p>
        </div>
    ) 
		
}