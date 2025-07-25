import React from "react";
import styles from "./CoursePage.module.css";
import PriceBox from "../PriceBox/PriceBox";

const lessons = [
  {
    title: "Lesson 1: Greetings and Introductions",
    videoUrl: "https://example.com/videos/lesson1.mp4",
    locked: false,
  },
  {
    title: "Lesson 2: Talking About Yourself",
    videoUrl: "https://example.com/videos/lesson2.mp4",
    locked: false,
  },
  {
    title: "Lesson 3: Everyday Phrases",
    videoUrl: "",
    locked: true,
  },
  {
    title: "Lesson 4: Asking Questions",
    videoUrl: "",
    locked: true,
  },
];

const CoursePage = () => {
  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.content}>
        <h2>Description</h2>
        <p className={styles.description}>
          This English course is designed for beginners who want to improve their everyday communication.
          You'll learn basic vocabulary, simple grammar, and useful phrases for travel, work, and daily life.
        </p>

        <h3>Course content</h3>
        <div className={styles.section}>
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className={`${styles.lessonBlock} ${lesson.locked ? styles.locked : ""}`}
            >
              <h4>{lesson.title}</h4>

              {lesson.locked ? (
                <div className={styles.lockedMessage}>🔒 This lesson is locked</div>
              ) : (
                <video
                  controls
                  width="100%"
                  className={styles.video}
                  poster="/preview.jpg"
                >
                  <source src={lesson.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>

        <h3>Requirements</h3>
        <p className={styles.description}>
          No prior knowledge is needed. Just bring your motivation to learn and a smile!
          A notebook and headphones are recommended for practice.
        </p>
      </div>

      <PriceBox />

      <section>
        <h4>Other Courses You May Like</h4>
      </section>
    </div>
  );
};

export default CoursePage;
