import React, { useState } from "react";
import styles from "./Hero.module.css";
import hero from "../../images/hero/hero.png";
import time from "../../images/icons/time.png";
import growth from "../../images/icons/growth.png";
import person from "../../images/icons/person.png";
import HeroForm from "../HeroForm/HeroForm";
import { useTranslation } from "react-i18next";
import LevelSelect from "../LevelSelect/LevelSelect";

function Hero() {
  const { t } = useTranslation();
  const [openRegister, setOpenLesson] = useState(false);

  const icons = [time, growth, person];
  const advantages = t("hero.advantages", { returnObjects: true });
  return (
    <div className={styles.wrap}>
      <section className={`${styles.hero} container`}>
        {/* Форма */}
        <div
          className={`modal ${styles.blockRegister} ${
            openRegister ? styles.openMenu : ""
          }`}
        >
          <HeroForm onClose={() => setOpenLesson(false)} />
        </div>

        <div className={styles.content}>
          <div className={styles.textBlock}>
            <h1 className={styles.title}>{t("hero.title")}</h1>
            <p className={styles.subtitle}>{t("hero.subtitle")}</p>
            <p className={styles.description}>{t("hero.description")}</p>
            <button
              onClick={() => setOpenLesson(true)}
              className={styles.button}
            >
              {t("hero.button")}
            </button>
          </div>
          <div className={styles.imageBlock}>
            <img
              src={hero}
              alt="Plane and buildings"
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.advantages}>
          {advantages.map((text, i) => (
            <div key={i} className={styles.advantageItem}>
              <img src={icons[i]} alt={text} />
              <p>{text}</p>
            </div>
          ))}
        </div>
        <span className={styles.lineSeperating}></span>

        <LevelSelect/>
      </section>
    </div>
  );
}

export default Hero;
