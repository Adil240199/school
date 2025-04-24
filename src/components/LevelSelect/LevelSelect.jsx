import React from "react";
import styles from "./LevelSelect.module.css";
import { courses } from "../../content/courses";
import arrow from "../../images/icons/rightArrow.png";

const LevelSelect = () => (
  <div className={styles.wrapper}>
    <div className={`${styles.mainContainer} container`}>
      <h2 className={styles["title-courses"]}>Выберите подходящий курс</h2>

      <div className={styles.blockCources}>
        {courses.map(({ id, img, title, price, description, levelClass }) => (
          <div key={id} className={`${styles.course} ${styles[levelClass]}`}>
            <div className={styles.top_feed}>
              <img src={img} alt="user" />
              <div className={styles.head_feed}>
                <p className={styles.h7}>{title}</p>
                <p className={styles.text_feed}>{price}</p>
              </div>
            </div>
            <div className={styles.container_text}>
              <p className={styles.text}>{description}</p>
            </div>
            <div className={styles.containerMore}>
              <img src={arrow} alt="arrow" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default LevelSelect;
