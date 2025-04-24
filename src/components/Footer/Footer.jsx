import React from 'react';
import styles from "./Footer.module.css";
import Social from '../Social/Social';
import { NavLink } from 'react-router-dom';
import logo from "../../images/brand/logo.png";
import { useEmailSubscribe } from '../../hooks/useEmailSubscribe';

const Footer = () => {
  const {
    email,
    isValid,
    handleChange,
    handleSubmit,
  } = useEmailSubscribe();

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
            Подписка на новости
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleChange}
            className={`${styles.emailInput} ${!isValid ? styles.invalid : ""}`}
            placeholder="example@email.com"
            required
          />
          <button className={styles.subscribeButton} type="submit">
            Подписаться
          </button>
          {!isValid && <span className={styles.errorText}>Неверный email</span>}
        </form>
      </div>
    </footer>
  );
};

export default Footer;
