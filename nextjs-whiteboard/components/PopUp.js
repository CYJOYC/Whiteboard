import React from 'react';  
import styles from './popup.module.css' 
import { useAuth } from '../hooks/useAuth'

export default function PopUp(props) {
	const auth = useAuth();

	if (props.isLogin) {
		return (  
			<div className={styles.popup}>  
				<div className={styles.popup_inner}>  
					<h1>Log In</h1>
					<form className={styles.form} onSubmit={auth.signIn} >
					 	<input type="text" name="email" placeholder="Email" />
					 	<input type="password" name="password" placeholder="Password" />
					  	<input type="submit" value="Log In" />
					</form>  
					<p className={styles.small_text}>Don’t have an account? <button onClick={props.signUp} className={styles.link}>Sign up here</button></p>
					<button onClick={props.closePopup}> x </button> 
				</div>  
			</div>  
		);
	} else {
		return (  
			<div className={styles.popup}>  
				<div className={styles.popup_inner}>  
					<h1>Sign Up</h1>
					<form className={styles.form} onSubmit={auth.signUp}>
					 	<input type="text" name="name" placeholder="Name" />
					 	<input type="text" name="email" placeholder="Email" />
					 	<input type="password" name="password" placeholder="Password" />
					  	<input type="submit" value="Create Account" />
					</form>  
					<p className={styles.small_text}>Already have an account? <button onClick={props.login} className={styles.link}>Login here</button></p>
					<button onClick={props.closePopup}> x </button> 
				</div>  
			</div>  
		);
	}
}  
