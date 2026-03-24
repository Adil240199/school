import React from "react";
import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Social from "../Social/Social";
import logo from "../../images/brand/logo.png";
import { useEmailSubscribe } from "../../hooks/useEmailSubscribe";

const Footer = () => {
  const { email, isValid, success, handleChange, handleSubmit } =
    useEmailSubscribe();

  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footerWrap}>
      <div className={`${styles.footer} container`}>
        {/* Logo */}
        <div className={styles.logoBlock}>
          <NavLink to="/" className={styles.wraplogo}>
            <img
              className={styles.logo}
              src={logo}
              alt="Raymea English School"
            />
          </NavLink>

          <p className={styles.footerText}>© {year} Raymea English School</p>
        </div>

        {/* Social links */}
        <Social />

        {/* Subscribe form */}
        <form onSubmit={handleSubmit} className={styles.subscribeForm}>
          <label htmlFor="email" className={styles.emailLabel}>
            {t("footer.subscribeTitle")}
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder={t("footer.placeholder")}
            className={`${styles.emailInput} ${!isValid ? styles.invalid : ""}`}
            required
          />

          <button type="submit" className={styles.subscribeButton}>
            {t("footer.subscribeButton")}
          </button>

          {/* Error */}
          {!isValid && (
            <span className={styles.errorText}>{t("footer.emailError")}</span>
          )}

          {/* Success */}
          {success && (
            <span className={styles.successText}>🎉 {t("footer.success")}</span>
          )}
        </form>
      </div>
    </footer>
  );
};

export default Footer;
