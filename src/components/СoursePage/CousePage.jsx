import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import styles from "./CoursePage.module.css";
import PriceBox from "../PriceBox/PriceBox";

const CoursePage = () => {
  const { courseId } = useParams();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchLessons = async () => {
      try {
        const { data } = await api.get(`/courses/${courseId}/lessons`);
        setLessons(data);
      } catch (err) {
        console.error("Error fetching lessons", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  const handlePlay = (lesson) => {
    setCurrentVideo(lesson.videoUrl);
  };

  return (
    <div className={`container ${styles.container}`}>
      <section>
        <h4>Course lessons</h4>

        {loading && <div>Loading...</div>}

        {!loading && (
          <ul className={styles.lessonList}>
            {lessons.map((lesson) => (
              <li key={lesson._id} className={styles.lessonItem}>
                <div className={styles.lessonTitle}>
                  {lesson.title}
                </div>

                <button
                  onClick={() => handlePlay(lesson)}
                  className={styles.playButton}
                >
                  ▶ Watch
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <aside>
        <PriceBox />
      </aside>

      {currentVideo && (
        <div className={styles.playerWrap}>
          <h5>Player</h5>
          <video controls src={currentVideo} style={{ width: "100%" }} />
          <button
            onClick={() => setCurrentVideo(null)}
            className={styles.closePlayer}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursePage;