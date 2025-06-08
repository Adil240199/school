import React, { useState, useCallback } from "react";
import styles from "./Testimonials.module.css";
import { useSlider } from "../../hooks/useSlider";
import { useTranslation } from "react-i18next";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import ReviewForm from "../ReviewForm/ReviewForm";
import { useReviews } from "../../hooks/useReviews";

export default function Testimonials() {
  const { sliderRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } = useSlider();
  const { t } = useTranslation();
  const { reviews, loading, error, addReview } = useReviews();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewReview = useCallback(async (review) => {
    try {
      await addReview(review);
      setIsModalOpen(false);
    } catch (e) {
      alert("Error: " + e.message);
    }
  }, [addReview]);

  if (loading) return <p>Loading reviews...</p>;
  if (error)   return <p>Error: {error}</p>;

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
        {reviews.map((review) => (
          <TestimonialCard key={review._id} {...review} />
        ))}
      </div>

      <button className={styles.button} onClick={() => setIsModalOpen(true)}>
        {t("testimonials.leaveReview")}
      </button>

      {isModalOpen && (
        <ReviewForm
          onSubmit={handleNewReview}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
