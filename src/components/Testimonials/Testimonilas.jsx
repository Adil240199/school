import React from "react";
import styles from "./Testimonials.module.css";
import { useSlider } from "../../hooks/useSlider";
import testimonials from "../../content/testimonials";
import TestimonialCard from "../TestimonialCard/TestimonialCard";

const Testimonials = () => {
  const {
    sliderRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
  } = useSlider();

  return (
    <div>
      <h2 className={styles.h5_tablet}>Отзывы</h2>
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={styles.Testimonials}
      >
        {testimonials.map((review, index) => (
          <TestimonialCard key={index} {...review} />
        ))}
      </div>
      <button className={styles.button}>Оставить отзыв</button>
    </div>
  );
};

export default Testimonials;
