import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import styles from '../controls.module.css'

function Eraser(props) {
  function handleEraser(e) {
    e.preventDefault();
    props.handleColor("#ffffff");
  }

  return (
    <div className={styles.erase}>
      <FontAwesomeIcon
        title="erase"
        icon={faEraser}
        className={styles.faIcon}
        onClick={handleEraser}
      />
    </div>
  );
}

export default Eraser;
