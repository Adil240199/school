import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CourseDetail.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import api, { API_BASE_URL } from "../../api";
const CourseDetail = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);

  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await api.get(`/courses/level/${level}`);
        const courseData = courseRes.data;

        setCourse(courseData);

        const lessonsRes = await api.get(`/courses/${courseData._id}/lessons`);
        setLessons(lessonsRes.data);
        console.log("Lessons:", lessonsRes.data);

        setLessons(lessonsRes.data);

        if (lessonsRes.data.length > 0) {
          setActiveLesson(lessonsRes.data[0]); // первый урок
        }
      } catch (err) {
        console.error("Course load error:", err);
      }
    };

    fetchData();
  }, [level]);

  if (!course) {
    return <p>Loading...</p>;
  }

  const handlePlay = (lesson) => {
    if (lesson.locked) {
      if (!user) {
        navigate("/login", { state: { from: `/courses/${level}` } });
      }
      return;
    }

    setActiveLesson(lesson);
  };

  return (
    <div className={`container ${styles.container}`}>
      <h1 className={styles.title}>{course.level} — Course</h1>

      <div className={styles.layout}>
        {/* VIDEO */}
        <div className={styles.player}>
          {activeLesson ? (
            <>
              <h3>{activeLesson.title}</h3>

              <video controls width="100%" controlsList="nodownload">
                <source
                  src={`${API_BASE_URL.replace("/api", "")}${
                    activeLesson.videoUrl
                  }`}
                  type="video/mp4"
                />
              </video>
            </>
          ) : (
            <p>Select lesson</p>
          )}
        </div>

        {/* LESSON LIST */}
        <ul className={styles.lessonList}>
          {lessons.map((lesson) => (
            <li key={lesson._id} className={styles.lessonItem}>
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
    </div>
  );
};

export default CourseDetail;
