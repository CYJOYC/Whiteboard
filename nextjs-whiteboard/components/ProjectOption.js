import styles from './projectoption.module.css'

export default function ProjectOption(props) {
	
    return(
        <div className={styles.option} onClick={props.onClick}>
            <button onClick={props.deleteProject} className={styles.button}> x </button>
            <p className={styles.projectName}>{props.name}</p>
        </div>
    ) 
		
}