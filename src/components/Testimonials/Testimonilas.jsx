import React, { useState, useEffect } from "react";
import styles from "./Testimonials.module.css";
import { useSlider } from "../../hooks/useSlider";
import { useTranslation } from "react-i18next";
import TestimonialCard from "../TestimonialCard/TestimonialCard";

const API_URL = "https://school-backend-c6gi.onrender.com"; // Заменить на твой backend URL после деплоя

const Testimonials = () => {
  const { sliderRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } =
    useSlider();
  const { t } = useTranslation();

  const [reviews, setReviews] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    location: "",
    text: "",
    img: "images/user.png",
  });

  // Загрузка отзывов с backend при загрузке компонента
  useEffect(() => {
    fetch(`${API_URL}/api/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Failed to fetch reviews:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      if (!res.ok) throw new Error("Failed to submit review");

      const savedReview = await res.json();
      setReviews((prev) => [...prev, savedReview]); // Добавляем сохранённый отзыв в список
      setNewReview({
        name: "",
        location: "",
        text: "",
        img: "images/user.png",
      });
      setIsModalOpen(false);
    } catch (err) {
      alert("Ошибка при отправке отзыва: " + err.message);
    }
  };

  return (
    <div>
      <h2 className={styles.h5_tablet}>{t("testimonials.title")}</h2>

      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={styles.Testimonials}
      >
        {reviews.map((review, index) => (
          <TestimonialCard key={index} {...review} />
        ))}
      </div>

      <button className={styles.button} onClick={() => setIsModalOpen(true)}>
        {t("testimonials.leaveReview")}
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>{t("testimonials.newReviewTitle") || "Leave a Review"}</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                name="name"
                placeholder="Name"
                value={newReview.name}
                onChange={handleChange}
                required
              />
              <input
                name="location"
                placeholder="Location"
                value={newReview.location}
                onChange={handleChange}
                required
              />
              <textarea
                name="text"
                placeholder="Your review"
                value={newReview.text}
                onChange={handleChange}
                required
              />
    
              <div className={styles.modalButtons}>
                <button className={styles.button} type="submit">Submit</button>
                <button className={styles.button} type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
