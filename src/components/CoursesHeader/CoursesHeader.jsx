import React from "react";
import styles from "./CousesHeader.module.css";
import imgbg from "../../images/backgroundImage.png";

function CousesHeader() {
  return (
      <div className={`container ${styles.hero}`}>
      <img
          src={imgbg}
          alt="Study in London"
          className={styles.backgroundImage}
        />
        <h1 className={styles.title}>
          A course for beginners — for everyone who never got started.
        </h1>
      </div>
  );
}

export default CousesHeader;
