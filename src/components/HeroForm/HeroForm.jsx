import React from "react";
import styles from "./HeroForm.module.css";
import { useHeroForm } from "../../hooks/useHeroForm";

function HeroForm({ onClose }) {
  const { formData, errors, handleChange, handleSubmit } = useHeroForm();

  return (
    <div>
      <div className={`${styles.containerSignLesson} container`}>
        <div className={styles.cross} onClick={onClose}>
          <div className={styles.horizontalLine}></div>
          <div className={styles.verticalLine}></div>
        </div>
        <h1>Запись на пробный урок</h1>
        <div className={styles.lines}>
          <span className={styles.line}></span>
          <h5 className={styles.some_text}>Ведите данные</h5>
          <span className={styles.line}></span>
        </div>
        <form className={styles.sign} onSubmit={handleSubmit}>
          {["name", "phone"].map((field) => (
            <p key={field} className={styles.sgn_text}>
              {field === "name" ? "Имя" : "Номер"} <br />
              <input
                className={styles[field === "name" ? "password" : "email"]}
                value={formData[field]}
                onChange={handleChange(field)}
              />
              {errors[field] && (
                <span className={styles.error}>{errors[field]}</span>
              )}
            </p>
          ))}
          <input
            className={styles.submit}
            type="submit"
            value="Отправить"
            onClick={onClose}
          />
        </form>
      </div>
    </div>
  );
}

export default HeroForm;
