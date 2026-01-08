import credits from "../assets/credits.json";
import GoHome from "../components/GoHome";
import styles from "./Credits.module.css";

function Credits() {
  return (
    <div className={styles.container}>
      <GoHome />
      <h3 className={styles.heading}>Image Attributions</h3>
      <div className={styles.grid}>
        {credits.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.info}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.author}>by {item.author}</span>
            </div>
            <div className={styles.links}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Source View
              </a>
              <span className={styles.badge}>{item.license}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Credits;
