import React, { useState, useMemo } from "react";
import styles from "./LevelSelect.module.css";
import arrow from "../../images/icons/rightArrow.png";
import { useTranslation } from "react-i18next";
import Popup from "../Popup/Popup";
import { useCourses } from "../../hooks/useCourses";
import PreLoader from "../preloader/preloader";

const LevelSelect = ({ variant = "default" }) => {
  const { courses, loading } = useCourses();
  const { t } = useTranslation();

  const [activeModal, setActiveModal] = useState(null);

  // находим активный курс только один раз
  const activeCourse = useMemo(
    () => courses.find((course) => course.level === activeModal),
    [courses, activeModal]
  );

  const openModal = (level) => setActiveModal(level);
  const closeModal = () => setActiveModal(null);

  if (loading) return <PreLoader />;

  return (
    <div className={`${styles.wrapper} ${styles[variant]}`}>
      <div className={`${styles.mainContainer} container`}>

        <h1 className={styles.titleCourses}>
          {t("levelSelect.title")}
        </h1>

        <div className={styles.blockCourses}>
          {courses.map((course) => (
            <div
              key={course.level}
              className={`${styles.course} ${styles[course.level]}`}
            >
              <div className={styles.topFeed}>
                <div className={styles.headFeed}>
                  <p className={styles.title}>{course.title}</p>
                  <p className={styles.price}>{course.price}</p>
                </div>
              </div>

              <img
                src={course.img}
                alt={course.title}
                className={styles.img}
              />

              <div
                className={styles.containerMore}
                role="button"
                tabIndex={0}
                onClick={() => openModal(course.level)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    openModal(course.level);
                  }
                }}
              >
                <img src={arrow} alt="open course" />
              </div>
            </div>
          ))}
        </div>

        {activeCourse && (
          <Popup
            title={activeCourse.title}
            onClose={closeModal}
          >
            <div className={styles.modalContent}>

              <div className={styles.textBlock}>
                {activeCourse.modalContent.map((line, index) =>
                  line.startsWith("- ") ? (
                    <li key={index} className={styles.listItem}>
                      {line.slice(2)}
                    </li>
                  ) : (
                    <p key={index} className={styles.paragraph}>
                      {line}
                    </p>
                  )
                )}
              </div>

              <button className={styles.startBtn}>
                Начать обучение
              </button>

            </div>
          </Popup>
        )}

      </div>
    </div>
  );
};

export default LevelSelect;