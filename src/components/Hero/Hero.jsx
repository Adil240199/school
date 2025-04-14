import React, { useState } from "react";
import styles from "./Hero.module.css";
import hero from "../../images/hero/hero.svg";
import time from "../../images/icons/time.svg";
import growth from "../../images/icons/growth.svg";
import person from "../../images/icons/person.svg";
import HeroForm from "../HeroForm/HeroForm";

function Hero() {
  const [openRegister, setOpenLesson] = useState(false);

  return (
    <section className={styles.hero}>
      {/* Форма */}
      <div className={`${styles.blockRegister} ${  openRegister ? styles.openMenu : "" }`}
      >
        <HeroForm onClose={() => setOpenLesson(false)} />
      </div>

      {/* Контент */}
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <h1 className={styles.title}>Добро пожаловать</h1>
          <p className={styles.subtitle}>в онлайн-школу английского языка</p>
          <p className={styles.description}>
            Изучайте английский, не выходя из дома комфортно
          </p>
          <button onClick={() => setOpenLesson(true)} className={styles.button}>
            Запись на пробный урок
          </button>
        </div>
        <div className={styles.imageBlock}>
          <img src={hero} alt="Plane and buildings" className={styles.image} />
        </div>
      </div>

      {/* Преимущества */}
      <div className={styles.advantages}>
        {[
          { icon: time, text: "Гибкий график" },
          { icon: growth, text: "Поддержка и обратная связь" },
          { icon: person, text: "Персонализированный подход" },
        ].map(({ icon, text }, i) => (
          <div key={i} className={styles.advantageItem}>
            <img src={icon} alt={text} />
            <p>{text}</p>
          </div>
        ))}
      </div>
      <span className={styles.lineSeperating}></span>
    </section>
  );
}

export default Hero;
