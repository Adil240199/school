import React from "react";
import styles from "./LevelSelect.module.css";
import { courses } from "../../content/courses";
import arrow from "../../images/icons/rightArrow.png";
import { useTranslation } from "react-i18next";

const LevelSelect = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.mainContainer} container`}>
        <h4 className={styles.titleCourses}>{t("levelSelect.title")}</h4>
        <div className={styles.blockCources}>
          {["elementary", "intermediate", "upper"].map((levelKey) => {
            const level = courses[levelKey];
            return (
              <div
                key={levelKey}
                className={`${styles.course} ${styles[level.levelClass]}`}
              >
                <div className={styles.top_feed}>
                  <img src={level.img} alt="course" />
                  <div className={styles.head_feed}>
                    <p className={styles.h7}>{t(`levelSelect.courses.${levelKey}.title`)}</p>
                    <p className={styles.text_feed}>{t(`levelSelect.courses.${levelKey}.price`)}</p>
                  </div>
                </div>
                <div className={styles.container_text}>
                  <p className={styles.text}>{t(`levelSelect.courses.${levelKey}.description`)}</p>
                </div>
                <div className={styles.containerMore}>
                  <img src={arrow} alt="arrow" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
