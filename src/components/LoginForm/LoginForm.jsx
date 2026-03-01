import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./LoginForm.module.css";
import { useTranslation } from "react-i18next";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ type: "", message: "" });

    // Валидация email
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError({
        type: "email",
        message: t("login.invalidEmail") || "Неверный формат email",
      });
      return;
    }

    setLoading(true);
    try {
      const data = await login(form);
      const role = String(data?.user?.role || "")
        .toLowerCase()
        .trim();
      navigate(role === "admin" ? "/admin" : "/courses", {
        replace: true,
      });
    } catch (e) {
      if (!e.response)
        setError({ type: "common", message: t("login.networkError") });
      else
        setError({
          type: "common",
          message: e.response.data?.error || t("login.error"),
        });
    } finally {
      setLoading(false);
    }
  };
  console.log("Igrok.nomer99@mail.ru, 123456");
  console.log("adik.muhametov@gmail.com", "654321");


  return (
    <form className={`${styles.form} container`} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{t("login.login")}</h2>

      <div className={styles.inputGroup}>
        <input
          id="login-email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className={`${styles.input} ${
            error.type === "email" ? styles.inputError : ""
          }`}
        />
        {error.type === "email" && (
          <p className={styles.error}>{error.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className={styles.input}
        />
      </div>

      {error.type === "common" && (
        <p className={styles.error}>{error.message}</p>
      )}

      <button type="submit" disabled={loading}>
        {loading ? t("login.loading") : t("login.login")}
      </button>

      <div className={styles.link}>
        <NavLink to="/password">{t("login.resetPassword")}</NavLink>
      </div>
    </form>
  );
}
