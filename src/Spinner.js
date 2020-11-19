import React from "react";
import "./css/spinner.css";

function Spinner(props) {
  return (
    <div className="loadingScreen">
      <div className="spinner">
        <i class="fas fa-circle-notch fa-lg fa-spin"></i>
        <span>{props.message}</span>
      </div>
    </div>
  );
}

Spinner.defaultProps = {
  message: "Loading...",
};

export default Spinner;
