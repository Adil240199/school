import React from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import logo from "../../images/brand/logo.png";
import NavLinkButton from "../buttons/NavLinkButton";
import { navbarLinks } from "../../content/navigation";
import { useNavbar } from "../../hooks/useNavbar";
import Social from "../Social/Social";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const { isOpen, handleClick, closeMenu } = useNavbar();

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.navWrap} container`}>
        <div className={styles.wraplogo}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : undefined
            }
          >
            <img className={styles.logo} src={logo} alt="logo" />
          </NavLink>
        </div>

        {/* Десктопное меню */}
        <ul className={styles.ulDesktop}>
          {navbarLinks.map(({ key, href }, index) => (
            <li key={index}>
              <NavLinkButton text={t(key)} href={href} />
            </li>
          ))}
        </ul>

        <div className={styles.wrapIconMobile}>
          <button
            onClick={handleClick}
            className={`${styles.buttonMobile} ${isOpen ? styles.rotate : ""}`}
          >
            {isOpen ? <span>&#10005;</span> : <span>&#9776;</span>}
          </button>
        </div>
        <LanguageSwitcher />
      </div>
      <div
        className={`${styles.mobileMenu} ${
          isOpen ? styles.open : styles.closed
        }`}
      >
        {/* Мобильное меню меню */}
        <div className={styles.ulMobileWrap}>
          <ul className={styles.ulMobile}>
            {navbarLinks.map(({ key, href }, index) => (
              <li key={index}>
                <NavLink
                  to={href}
                  onClick={closeMenu}
                  className={styles.linkMobile}
                >
                  {t(key)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles.wrapSocial}>
            <Social />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
