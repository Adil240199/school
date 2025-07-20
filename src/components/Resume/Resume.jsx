import React, { useRef } from "react";
import styles from "./Resume.module.css";
import { useTranslation } from "react-i18next";
import useOnScreen from "../../hooks/useOnScreen";
import teacher from "../../images/brand/teacher.png"
import shape from "../../images/girlshape.png"
import element from "../../images/element.png"

const blocks = [
  "experience",
  "certificates",
  "education",
  "about"
];

const Resume = () => {
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef, "-100px");
  const { t } = useTranslation();

  return (
    <section
      ref={sectionRef}
      className={`${styles.resume} container ${isVisible ? styles.visible : ""}`}
    >
      <h2 className={styles.title}>{t("resume.title")}</h2>
      <div className={styles.blockAboutMe}>
        <div className={styles.blockPhoto}>
        <img className={styles.shape} src={shape} alt="shape" />
          <img
          className={styles.imgAboutme}
          src={teacher}
          alt={t("resume.profileAlt")}
          />
        </div>
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
      <img className={styles.element} src={element} alt="shape" />
    </section>
  );
};

export default Resume;
