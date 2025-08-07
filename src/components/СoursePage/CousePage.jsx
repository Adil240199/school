import React from "react";
import styles from "./CoursePage.module.css";
import PriceBox from "../PriceBox/PriceBox";


const CoursePage = () => {
  return (
    <div className={`container ${styles.container}`}>
      

                <div className={styles.lockedMessage}>🔒 This lesson is locked</div>
        

      <PriceBox />
      <section>
        <h4>Other Courses You May Like</h4>
      </section>
    </div>
  );
};

export default CoursePage;
