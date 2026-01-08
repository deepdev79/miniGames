import { Link } from "react-router-dom";
import styles from "./GameBox.module.css";
import type { ReactNode } from "react";
import { motion } from "motion/react";

interface GameBoxProps {
  children: ReactNode;
  gamepic: string;
  path: string;
  variants: {};
}

function GameBox({ variants, children, gamepic, path }: GameBoxProps) {
  return (
    <motion.div
      variants={variants}
      className={styles.gameBox}
      whileHover={{ scale: 1.1 }}
    >
      <img src={gamepic} alt="" />
      {children}
      <Link to={path}>
        <button className={styles.btn}>PLAY NOW</button>
      </Link>
    </motion.div>
  );
}

export default GameBox;
