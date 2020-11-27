import styles from './projectform.module.css'
// import { dashboard } from './dahsboard';
import { useRequireAuth } from '../hooks/useRequireAuth';
// import dahsboard from '../pages/dashboard';
// import {createProject} from '../pages/dashboard';
// import { db } from '../config/firebase';


export default function ProjectForm(props) {

    return (
        <div className={styles.popup}>  
				<div className={styles.popup_inner}>  
					<h1>{props.title}</h1>
					<form className={styles.form} onSubmit={props.onSubmit} >
					 	<input type="text" name={props.name} placeholder={props.placeholder} />
					  	<input type="submit" value={props.submitvalue} />
					</form> 
					<button onClick={props.closeProjectForm}> x </button> 
				</div>  
		</div>  
    )
}