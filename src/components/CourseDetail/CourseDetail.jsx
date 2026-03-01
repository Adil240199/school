import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CourseDetail.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const CourseDetail = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Получаем курс по level
        const courseRes = await axios.get(
          `http://localhost:3000/api/courses/level/${level}`
        );

        const courseData = courseRes.data;
        setCourse(courseData);

        // 2️⃣ Получаем уроки по courseId
        const lessonsRes = await axios.get(
          `http://localhost:3000/api/courses/${courseData._id}/lessons`
        );

        setLessons(lessonsRes.data);
      } catch (err) {
        console.error("Course load error:", err);
      }
    };

    fetchData();
  }, [level]);

  if (!course) {
    return <p>Loading...</p>;
  }

  const handlePlay = async (lesson) => {
    if (lesson.locked) {
      if (!user) {
        navigate("/login", { state: { from: `/courses/${level}` } });
      }
      return;
    }

    alert(`Play: ${lesson.title}`);
  };

  return (
    <div className={`container ${styles.container}`}>
      <h1 className={styles.title}>{course.level} — Course</h1>

      <ul className={styles.lessonList}>
        {lessons.map((lesson) => (
          <li key={lesson.id} className={styles.lessonItem}>
            <div>
              <strong>{lesson.title}</strong>
              <div>{lesson.duration}</div>
            </div>

            <button onClick={() => handlePlay(lesson)}>
              {lesson.locked ? "🔒 Locked" : "▶ Play"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetail;
