import React, { useState } from "react";
import styles from "./LevelSelect.module.css";
import arrow from "../../images/icons/rightArrow.png";
import { useTranslation } from "react-i18next";
import Popup from "../Popup/Popup";
import { useCourses } from "../../hooks/useCourses";
import PreLoader from "../preloader/preloader";
const LevelSelect = ({ variant = "default" }) => {
  const { courses, loading } = useCourses();
  const [activeModal, setActiveModal] = useState(null);
  const { t } = useTranslation();

  if (loading) return <PreLoader />;

  return (
    <div className={`${styles.wrapper} ${styles[variant]}`}>
      <div className={`${styles.mainContainer} container`}>
        <h1 className={styles.titleCourses}>{t("levelSelect.title")}</h1>
        <div className={styles.blockCources}>
          {courses.map((course) => (
          
          <div key={course.level} className={`${styles.course} ${styles[course.level]}`}>
          <div className={styles.top_feed}>
            <img src={course.img} alt="course" className={styles.img} />
            <div className={styles.head_feed}>
              <p className={styles.h7}>{course.title}</p>
              <p className={styles.text_feed}>{course.price}</p>
            </div>
          </div>
          <div className={styles.container_text}>
            <p className={styles.text}>{course.description}</p>
          </div>
          <div className={styles.containerMore} onClick={() => setActiveModal(course.level)}>
            <img src={arrow} alt="arrow" />
          </div>
        </div>
            
          ))}
        </div>

        {activeModal && (
          <Popup
            title={courses.find((c) => c.level === activeModal)?.title}
            onClose={() => setActiveModal(null)}
          >
           <div>
              {courses
                .find((c) => c.level === activeModal)
                ?.modalContent.map((line, index) =>
                  line.startsWith("- ") ? (
                    <li key={index}>{line.slice(2)}</li>
                  ) : (
                    <p key={index}>{line}</p>
                  )
                )}
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
};

export default LevelSelect;
