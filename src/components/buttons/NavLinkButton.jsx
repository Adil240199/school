import { Link } from "react-router-dom";
import styles from "./Buttons.module.css";

const NavLinkButton = ({ text, href }) => {
  return (
    <Link to={href} className={styles.navlinkButton}>
      {text}
    </Link>
  );
};

export default NavLinkButton
