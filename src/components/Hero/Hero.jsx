import React, { useState } from "react";
import styles from "./Hero.module.css";
import hero from "../../images/hero/heroTwo.png";
import time from "../../images/icons/time.svg";
import growth from "../../images/icons/growth.svg";
import person from "../../images/icons/person.svg";
import HeroForm from "../HeroForm/HeroForm";
import { useTranslation } from "react-i18next";

function Hero() {
  const { t } = useTranslation();
  const [openRegister, setOpenLesson] = useState(false);

  const icons = [time, growth, person];
  const advantages = t("hero.advantages", { returnObjects: true });
  return (
    <section className={`${styles.hero} container`}>
      {/* Форма */}
      <div
        className={`${styles.blockRegister} ${
          openRegister ? styles.openMenu : ""
        }`}
      >
        <HeroForm onClose={() => setOpenLesson(false)} />
      </div>

      {/* Контент */}
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <h1 className={styles.title}>{t("hero.title")}</h1>
          <p className={styles.subtitle}>{t("hero.subtitle")}</p>
          <p className={styles.description}>{t("hero.description")}</p>
          <button onClick={() => setOpenLesson(true)} className={styles.button}>
            {t("hero.button")}
          </button>
        </div>
        <div className={styles.imageBlock}>
          <img src={hero} alt="Plane and buildings" className={styles.image} />
        </div>
      </div>

      {/* Преимущества */}
      <div className={styles.advantages}>
        {advantages.map((text, i) => (
          <div key={i} className={styles.advantageItem}>
            <img src={icons[i]} alt={text} />
            <p>{text}</p>
          </div>
        ))}
      </div>
      <span className={styles.lineSeperating}></span>
    </section>
  );
}

export default Hero;
