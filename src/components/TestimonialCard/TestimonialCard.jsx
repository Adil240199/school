import React from "react";
import styles from "./TestimonialCard.module.css";

const TestimonialCard = ({ name, location, text, img, specialClass }) => (
  <div className={`${styles.testimonial} ${specialClass ? styles[specialClass] : ''}`}>
    <div className={styles.topFeed}>
      <img className={styles.userImg} src={img} alt={name} />
      <div>
        <p className={styles.name}>{name}</p>
        <p className={styles.location}>{location}</p>
      </div>
    </div>
    <p className={styles.text}>{text}</p>
  </div>
);

export default TestimonialCard;
