import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const languageCodes = ["ru", "en", "kz"];
  const currentLang = i18n.language;

  const currentLangCode = languageCodes.includes(currentLang) ? currentLang : "ru";
  const otherLanguages = languageCodes.filter(code => code !== currentLangCode);

  const handleChangeLanguage = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className={styles.languageBlock}>
      <div className={styles.languageChose}>
        <b>{t("navbar.language")}:</b>
        <span onClick={() => setOpen(!open)}>{t(`languages.${currentLangCode}`)}</span>
      </div>
      {open && (
        <div className={styles.languagePopup}>
          <ul>
            {otherLanguages.map((code) => (
              <li key={code} onClick={() => handleChangeLanguage(code)}>
                {t(`languages.${code}`)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
