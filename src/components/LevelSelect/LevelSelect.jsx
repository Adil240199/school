import React, { useState } from "react";
import styles from "./LevelSelect.module.css";
import { courses } from "../../content/courses";
import arrow from "../../images/icons/rightArrow.png";
import { useTranslation } from "react-i18next";
import Popup from "../Popup/Popup";
const LevelSelect = ({ variant = "default" }) => {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className={`${styles.wrapper} ${styles[variant]}`}>
      <div className={`${styles.mainContainer} container`}>
        <h4 className={styles.titleCourses}>{t("levelSelect.title")}</h4>
        <div className={styles.blockCources}>
          {["elementary", "intermediate", "upper"].map((key) => {
            const lvl = courses[key];
            return (
              <div
                key={key}
                className={`${styles.course} ${styles[lvl.levelClass]}`}
              >
                <div className={styles.top_feed}>
                  <img src={lvl.img} alt="course" />
                  <div className={styles.head_feed}>
                    <p className={styles.h7}>
                      {t(`levelSelect.courses.${key}.title`)}
                    </p>
                    <p className={styles.text_feed}>
                      {t(`levelSelect.courses.${key}.price`)}
                    </p>
                  </div>
                </div>
                <div className={styles.container_text}>
                  <p className={styles.text}>
                    {t(`levelSelect.courses.${key}.description`)}
                  </p>
                </div>
                <div
                  className={styles.containerMore}
                  onClick={() => setActiveModal(key)}
                >
                  <img src={arrow} alt="arrow" />
                </div>
              </div>
            );
          })}
        </div>

        {activeModal && (
          <Popup
            title={t(`levelSelect.courses.${activeModal}.title`)}
            onClose={() => setActiveModal(null)}
          >
            <div>
              {t(`levelSelect.modals.${activeModal}.content`, {
                returnObjects: true,
              }).map((line, index) => {
                if (line.startsWith("- ")) {
                  return <li key={index}>{line.slice(2)}</li>;
                }
                return <p key={index}>{line}</p>;
              })}
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
};

export default LevelSelect;
