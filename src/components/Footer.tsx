import { Link } from "react-router-dom";
import githubLogo from "../assets/githublogo.png";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/deepdev79/miniGames"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.links}
      >
        <img
          src={githubLogo}
          alt="Github icon"
          width="25"
          className="footer__img"
        />
        <p className={styles.description}>Developed by deepdev79</p>
      </a>
      <Link to="/Credits" className={styles.links}>
        Credits
      </Link>
    </footer>
  );
}

export default Footer;
