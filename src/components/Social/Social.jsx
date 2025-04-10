"use client";
import styles from "./Social.module.css";
import SocialButton from "../buttons/SocialButton.jsx";
import { iconMap, socialItems } from "../../content/social";

const Social = () => {
  const handleOpen = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.social}>
      {socialItems.map((item, index) => {
        const IconComponent = iconMap[item.icon];

        return (
          <SocialButton
            key={index}
            icon={<IconComponent className={styles.socIcon} />}
            onClick={() => handleOpen(item.link)}
            className={styles.socialButton}
          />
        );
      })}
    </div>
  );
};

export default Social;
