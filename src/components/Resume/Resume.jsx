import React, { useRef } from "react";
import styles from "./Resume.module.css";
import useOnScreen from "../../hooks/useOnScreen";
import { useTranslation } from "react-i18next";

const Resume = () => {
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef, "-100px");
  const { t } = useTranslation();

  const blocks = [
    "experience",
    "certificates",
    "education",
    "about"
  ];

  return (
    <section
      ref={sectionRef}
      className={`${styles.resume} container ${isVisible ? styles.visible : ""}`}
    >
      <h2 className={styles.title}>{t("resume.title")}</h2>
      <div className={styles.blockAboutMe}>
        <img
          className={styles.imgAboutme}
          src="images/teacher.jpg"
          alt={t("resume.profileAlt")}
        />
        <div className={styles.rightBlockResume}>
          <h3 className={styles.textName}>{t("resume.name")}</h3>

          {blocks.map((key, index) => (
            <div
              key={key}
              className={`${styles.sectionBlock} ${
                isVisible ? styles[`fadeIn${index}`] : ""
              }`}
            >
              <span className={styles.sectionTitle}>{t(`resume.${key}.title`)}</span>
              <p className={index === 3 ? styles.aboutText : styles.sectionText}>
                {t(`resume.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resume;
