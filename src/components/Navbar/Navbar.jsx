import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import logo from "../../images/brand/logoWhite.png";
import NavLinkButton from "../buttons/NavLinkButton";
import { navbarLinks } from "../../content/navigation";
import { useNavbar } from "../../hooks/useNavbar";
import Social from "../Social/Social";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { t } = useTranslation();
  const { isOpen, handleClick, closeMenu } = useNavbar();

  const { isAdmin, user, logout } = useAuth();
  const [isLoggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
    } catch (err) {
      console.error("Logout failed", err);
      setLoggingOut(false);
    }
  };

  const handleMobileLogout = async () => {
    closeMenu();
    await handleLogout();
  };

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

        <ul className={styles.ulDesktop}>
          {navbarLinks.map(({ key, href }, index) => (
            <li key={index}>
              <NavLinkButton text={t(key)} href={href} />
            </li>
          ))}

          {isAdmin && (
            <li>
              <NavLink className={styles.login} to="/admin">
                Admin
              </NavLink>
            </li>
          )}

          {user ? (
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className={styles.login}
                disabled={isLoggingOut}
                aria-label={t("login.logout")}
              >
                {t("login.logout")}
              </button>
            </li>
          ) : (
            <li>
              <NavLink className={styles.login} to="/login">
                {t("login.login")}
              </NavLink>
            </li>
          )}
        </ul>

        <div className={styles.wrapIconMobile}>
          <button
            onClick={handleClick}
            className={`${styles.buttonMobile} ${isOpen ? styles.rotate : ""}`}
          >
            {isOpen ? <span>&#10005;</span> : <span>&#9776;</span>}
          </button>
        </div>

        <div className={styles.buttons}>
          <LanguageSwitcher />
        </div>
      </div>

      <div
        className={`${styles.mobileMenu} ${
          isOpen ? styles.open : styles.closed
        }`}
      >
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

            {isAdmin && (
              <li>
                <NavLink
                  className={styles.login}
                  to="/admin"
                  onClick={closeMenu}
                >
                  Admin
                </NavLink>
              </li>
            )}

            {user ? (
              <li>
                <button
                  type="button"
                  onClick={handleMobileLogout}
                  className={styles.login}
                  disabled={isLoggingOut}
                >
                  {t("login.logout")}
                </button>
              </li>
            ) : (
              <li>
                <NavLink
                  className={styles.login}
                  to="login"
                  onClick={closeMenu}
                >
                  {t("login.login")}
                </NavLink>
              </li>
            )}
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
