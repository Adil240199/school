import React, { useRef } from "react";
import styles from "./Resume.module.css";
import useOnScreen from "../../hooks/useOnScreen";
import sectionBlocks from "../../content/resume";

const Resume = () => {
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef, "-100px");

  return (
    <section
      ref={sectionRef}
      className={`${styles.resume} container ${
        isVisible ? styles.visible : ""
      }`}
    >
      <h2 className={styles.title}>Всё обо мне</h2>
      <div className={styles.blockAboutMe}>
        <img
          className={styles.imgAboutme}
          src="images/teacher.jpg"
          alt="Профильная фотография"
        />
        <div className={styles.rightBlockResume}>
          <h3 className={styles.textName}>Арай Нурулаева</h3>

          {sectionBlocks.map((block, index) => (
            <div
              key={index}
              className={`${styles.sectionBlock} ${
                isVisible ? styles[`fadeIn${index}`] : ""
              }`}
            >
              <span className={styles.sectionTitle}>{block.title}</span>
              <p
                className={index === 3 ? styles.aboutText : styles.sectionText}
              >
                {block.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resume;
