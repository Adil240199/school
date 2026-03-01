import React, { useState, useContext } from "react";
import styles from "./LevelSelect.module.css";
import arrow from "../../images/icons/rightArrow.png";
import { useTranslation } from "react-i18next";
import Popup from "../Popup/Popup";
import { useCourses } from "../../hooks/useCourses";
import PreLoader from "../preloader/preloader";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const LevelSelect = ({ variant = "default" }) => {
  const { courses, loading } = useCourses();
  const [activeModal, setActiveModal] = useState(null);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (loading) return <PreLoader />;

  const handleMore = (course) => {
    // если пользователь залогинен — переходим на страницу курса
    if (user) {
      // у тебя в модели level уникален — используем его как идентификатор временно
      navigate(`/courses/${course.level}`);
    } else {
      // если не залогинен — показываем popup (как сейчас)
      setActiveModal(course.level);
    }
  };

  return (
    <div className={`${styles.wrapper} ${styles[variant]}`}>
      <div className={`${styles.mainContainer} container`}>
        <h1 className={styles.titleCourses}>{t("levelSelect.title")}</h1>
        <div className={styles.blockCources}>
          {courses.map((course) => (
            <div
              key={course.level}
              className={`${styles.course} ${styles[course.level]}`}
            >
              <div className={styles.top_feed}>
                <div className={styles.head_feed}>
                  <p className={styles.h7}>{course.title}</p>
                  <p className={styles.text_feed}>{course.price}</p>
                </div>
              </div>

              <img src={course.img} alt="course" className={styles.img} />

              <div
                className={styles.containerMore}
                onClick={() => handleMore(course)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleMore(course);
                }}
              >
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
