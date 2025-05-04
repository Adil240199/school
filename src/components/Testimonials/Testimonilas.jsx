import React from "react";
import styles from "./Testimonials.module.css";
import { useSlider } from "../../hooks/useSlider";
import { useTranslation } from "react-i18next";
import TestimonialCard from "../TestimonialCard/TestimonialCard";

const Testimonials = () => {
  const { sliderRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } =
    useSlider();

  const { t } = useTranslation();

  const reviews = t("testimonials.reviews", { returnObjects: true });

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
      <button className={styles.button}>{t("testimonials.leaveReview")}</button>
    </div>
  );
};

export default Testimonials;
