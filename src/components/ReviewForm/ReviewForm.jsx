import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ReviewForm.module.css";

export default function ReviewForm({ onSubmit, onCancel }) {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    location: "",
    text: "",
    img: "images/user.png",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, img: "images/user.png" });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>{t("testimonials.newReviewTitle")}</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />
          <textarea
            name="text"
            placeholder="Your review"
            value={form.text}
            onChange={handleChange}
            required
          />
          <div className={styles.modalButtons}>
            <button type="submit">
              Submit
            </button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
