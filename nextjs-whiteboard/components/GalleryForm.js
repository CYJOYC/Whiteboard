import styles from './galleryform.module.css'

export default function GalleryForm(props) {

    return (
        <div className={styles.popup}>  
				<div className={styles.popup_inner}>  
					<h1>{props.title}</h1>
					<form className={styles.form} onSubmit={props.onSubmit} >
					 	<input type="text" name={props.name} placeholder={props.placeholder} />
					  	<input type="submit" value={props.submitvalue} />
					</form> 
					<button className={styles.button} onClick={props.closeGalleryForm}> x </button> 
				</div>  
		</div>  
    )
}