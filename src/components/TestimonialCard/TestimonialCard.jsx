import React, { useState, useEffect } from "react";
import styles from "./TestimonialCard.module.css";

const TestimonialCard = ({ name, location, text = "", img, specialClass }) => {
  const [open, setOpen] = useState(false);
  const isLong = text.length > 200;
  const preview = isLong ? text.slice(0, 200) + "…" : text;

  const handleToggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <div
        className={`${styles.testimonial} ${
          specialClass && styles[specialClass]
        }`}
      >
        <div className={styles.topFeed}>
          <img className={styles.userImg} src={img} alt={name} />
          <div>
            <p className={styles.name}>{name}</p>
            <p className={styles.location}>{location}</p>
          </div>
        </div>
        <p className={styles.previewText}>{preview}</p>
        {isLong && (
          <button className={styles.readMore} onClick={handleToggle}>
            Read More
          </button>
        )}
      </div>

      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p className={styles.modalText}>{text}</p>
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TestimonialCard;
