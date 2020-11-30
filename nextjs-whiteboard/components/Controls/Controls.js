import React from "react";
import styles from "../controls.module.css";
import Color from "../Color/Color";
import Eraser from "../Eraser/Eraser";
import { useState } from 'react';

function Controls(props) {
	return (
		<div className={styles.controls}>
			<Color handleColor={props.handleColor} />
			<Eraser handleColor={props.handleColor} />
		</div>
	);
}

export default Controls;
