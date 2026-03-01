import React, { useState } from "react";
import styles from "./PriceBox.module.css";
import RequestModal from "../RequestModal/RequestModal";

const features = [
  "📺 10 hours on-demand video",
  "🔒 Full lifetime access",
  "📱 Access on mobile",
  "📄 Certificate of completion",
];

const PriceBox = () => {
  const [openRequest, setOpenRequest] = useState(false);

  return (
    <div className={styles.priceBox}>
      <div className={styles.card}>
        <p className={styles.price}>
          $19.99 <span className={styles.old}>$99.99</span>
        </p>
        <button onClick={() => setOpenRequest(true)}>
          Buy Now
        </button>
        <p className={styles.guarantee}>30-Day Money-Back Guarantee</p>
        <ul className={styles.features}>
          {features.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <a href="mailto:support@example.com" className={styles.contact}>
          Have a question? Contact us
        </a>
      </div>
      {openRequest && <RequestModal  onClose={() => setOpenRequest(false)} />}
    </div>
  );
};

export default PriceBox;
