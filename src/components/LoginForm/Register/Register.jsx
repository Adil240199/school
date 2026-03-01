import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import styles from "./Register.module.css";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      window.location.href = "/courses";
    } catch (e) {
      setError(e.response?.data?.error || "Ошибка регистрации");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.h3}> Create an account</h3>

        <input
          id="register-name"
          type="text"
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name"
          autoComplete="name"
          required
          className={styles.input}
        />
        <label htmlFor="register-email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          required
          className={styles.input}
        />

        <input
          id="register-password"
          type="password"
          name="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          autoComplete="new-password"
          required
          className={styles.input}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button}>
          Create
        </button>

        <div>
          <NavLink to="./login" className={styles.link}>
            Already have an account? Sign In
          </NavLink>
        </div>
      </form>
    </div>
  );
}
