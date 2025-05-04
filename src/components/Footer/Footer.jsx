import React from "react";
import styles from "./Footer.module.css";
import Social from "../Social/Social";
import { NavLink } from "react-router-dom";
import logo from "../../images/brand/logo.png";
import { useEmailSubscribe } from "../../hooks/useEmailSubscribe";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { email, isValid, handleChange, handleSubmit } = useEmailSubscribe();

  const { t } = useTranslation();

  return (
    <footer className={styles.footerWrap}>
      <div className={`${styles.footer} container`}>
        <div className={styles.logoBlock}>
          <NavLink to="/" className={styles.wraplogo}>
            <img className={styles.logo} src={logo} alt="logo" />
          </NavLink>
          <p className={styles.footerText}>
            &copy; {new Date().getFullYear()} Raymea English School
          </p>
        </div>

        <Social />

        <form onSubmit={handleSubmit} className={styles.subscribeForm}>
          <label htmlFor="email" className={styles.emailLabel}>
            {t("footer.subscribeTitle")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleChange}
            className={`${styles.emailInput} ${!isValid ? styles.invalid : ""}`}
            placeholder={t("footer.placeholder")}
            required
          />
          <button className={styles.subscribeButton} type="submit">
            {t("footer.subscribeButton")}
          </button>
          {!isValid && (
            <span className={styles.errorText}>{t("footer.emailError")}</span>
          )}
        </form>
      </div>
    </footer>
  );
};

export default Footer;
