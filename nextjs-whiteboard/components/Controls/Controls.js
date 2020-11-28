import React from "react";
import "../controls.module.css";
import Color from "../Color/Color";
import Eraser from "../Eraser/Eraser";

function Controls(props) {
  return (
    <div className="controls">
      <Color handleColor={props.handleColor} />
      <Eraser handleColor={props.handleColor} />
    </div>
  );
}

export default Controls;
