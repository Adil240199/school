import React, { useContext } from "react";
import { useCourses } from "../../hooks/useCourses";
import PreLoader from "../preloader/preloader";
import styles from "./MyCoursesPage.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import arrow from "../../images/icons/rightArrow.png";

function MyCoursesPage() {
  const { courses, loading } = useCourses();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    // если не авторизован, можно редиректить на главную или показать сообщение
    navigate("/");
    return null;
  }

  if (loading) return <PreLoader />;

  const handleMore = (course) => {
    navigate(`/courses/${course.level}`);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.titleCourses}>Мои курсы</h1>
  
      <div className={styles.grid}>
        {courses.map((course) => (
          <div
            key={course.level}
            className={styles.card}
            onClick={() => handleMore(course)}
          >
            <img src={course.img} alt={course.title} className={styles.image} />
  
            <div className={styles.cardContent}>
              <h3>{course.title}</h3>
  
              <button className={styles.openBtn}>
                Открыть курс
                <img src={arrow} alt="arrow" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCoursesPage;