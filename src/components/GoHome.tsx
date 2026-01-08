import { useNavigate } from "react-router-dom";
import styles from "./GoHome.module.css";
function GoHome() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <button
        onClick={goHome}
        aria-label="Go to homepage"
        className={styles.homeBtn}
      >
        Home
      </button>
    </div>
  );
}

export default GoHome;
