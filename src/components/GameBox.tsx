import styles from "./GameBox.module.css";
import type { ReactNode } from "react";

interface GameBoxProps {
  children: ReactNode;
  gamepic: string;
}

function GameBox({ children, gamepic }: GameBoxProps) {
  return (
    <div className={styles.gameBox}>
      <img src={gamepic} alt="" />
      {children}
      <button>Play Now</button>
    </div>
  );
}

export default GameBox;
