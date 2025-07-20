import React from "react";
import loading from "../../images/icons/loading.svg";
let PreLoader = () => {
  return (
    <div>
      <img
        src={loading}
        alt="loader"
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          margin: "auto",
          width: "150px",
        }}
      />
    </div>
  );
};

export default PreLoader;
