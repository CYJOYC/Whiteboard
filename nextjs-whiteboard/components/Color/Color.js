import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import styles from '../controls.module.css'

function Color(props) {
  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };
  const [displayed, setDisplayed] = useState(false);
  const [color, setColor] = useState("#000000");

  function handleClick() {
    props.handleColor(color);
    setDisplayed(true);
  }

  function handleClose() {
    setDisplayed(false);
  }

  function handleChange(pickerColor) {
    setColor(pickerColor.hex);
    props.handleColor(pickerColor.hex);
  }

  return (
    <div className={styles.color}>
      <FontAwesomeIcon
        onClick={handleClick}
        title="choose color"
        className={styles.faIcon}
        icon={faPalette}
      />
      {displayed ? (
        <div style={popover}>
          <div style={cover} onClick={handleClose} />
          <ChromePicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
}

export default Color;
