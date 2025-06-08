import React, { useState } from "react";
import styles from "./TestimonialCard.module.css";

const TestimonialCard = ({ name, location, text, img, specialClass }) => {
  const [open, setOpen] = useState(false);
  const isLong = text.length > 200;
  const preview = isLong ? text.slice(0, 200) + "..." : text;

  return (
    <>
      <div className={`${styles.testimonial} ${specialClass && styles[specialClass]}`}>
        <div className={styles.topFeed}>
          <img className={styles.userImg} src={img} alt={name} />
          <div>
            <p className={styles.name}>{name}</p>
            <p className={styles.location}>{location}</p>
          </div>
        </div>
        <p className={styles.previewText}>{preview}</p>
        {isLong && (
          <button className={styles.readMore} onClick={() => setOpen(true)}>
            Читать полностью
          </button>
        )}
      </div>

      {open && (
        <div className={styles.modalOverlay} onClick={() => setOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <p className={styles.modalText}>{text}</p>
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TestimonialCard;
