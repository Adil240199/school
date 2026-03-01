import React, { useState } from "react";
import api from "../../api";
import styles from "./RequestModal.module.css";

export default function RequestModal({ courseId, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/requests", { ...form, courseId });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка, попробуйте позже");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`modal ${styles.modal}`}>
      <button className={styles.close} onClick={onClose}>
        ×
      </button>
      {!done ? (
        <>
          <h3>Запрос доступа к курсу</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              name="name"
              placeholder="Имя"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className={styles.input}
              name="email"
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className={styles.input}
              name="phone"
              placeholder="Телефон"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <textarea
              className={styles.textarea}
              name="message"
              placeholder="Сообщение (необязательно)"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" disabled={loading}>
              {loading ? "Отправка..." : "Отправить"}
            </button>
          </form>
        </>
      ) : (
        <div>
          <h3>Спасибо!</h3>
          <p>Мы получили ваш запрос и свяжемся с вами для оплаты курса.</p>
          <button onClick={onClose}>Закрыть</button>
        </div>
      )}
    </div>
  );
}
