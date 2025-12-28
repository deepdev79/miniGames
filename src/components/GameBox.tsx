import { Link } from "react-router-dom";
import styles from "./GameBox.module.css";
import type { ReactNode } from "react";

interface GameBoxProps {
  children: ReactNode;
  gamepic: string;
  path: string;
}

function GameBox({ children, gamepic, path }: GameBoxProps) {
  return (
    <div className={styles.gameBox}>
      <img src={gamepic} alt="" />
      {children}
      <Link to={path}>
        <button>Play Now</button>
      </Link>
    </div>
  );
}

export default GameBox;
