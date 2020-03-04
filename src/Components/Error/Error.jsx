import React from "react";
import Icon from "./Error.png";
const Error = props => {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <img
        src={Icon}
        style={{ width: "100vw", maxWidth: "320px" }}
        alt="Error"
      />
      <h2 style={{ fontFamily: "monospace" }}>Error 404 Not Found</h2>
    </div>
  );
};

export default Error;
