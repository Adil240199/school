import styles from "./Buttons.module.css";

const SocialButton = ({ icon, onClick, className }) => {
  return (
    <button onClick={onClick} className={`${styles.SocialButton} ${className}`}>
      {icon}
    </button>
  );
};

export default SocialButton;
