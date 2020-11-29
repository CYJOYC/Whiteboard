import styles from './popcode.module.css' 

export default function PopCode(props) {
    return (
        <div className={styles.popup}>  
			<div className={styles.popup_inner}>  
				<h1>Gallery Room Code</h1>
                    <div>{props.code}</div>
					<button className={styles.button} onClick={props.closePopCode}> x </button> 
				</div>  
			</div>  
    )
}  
