import styles from './loader.module.css';

const Loader = ({ message }) => {
  	return (
	    <div className={styles.loaderContainer}>
		     <div className={styles.loader} />
		     <span className={styles.loadingText}>{message ? message : "Loading..."}</span>
	    </div>
  	)
};

export default Loader;
