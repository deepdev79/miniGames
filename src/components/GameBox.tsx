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
    <motion.div variants={variants} className={styles.gameBox}>
      <img src={gamepic} alt="" />
      {children}
      <Link to={path}>
        <button>Play Now</button>
      </Link>
    </motion.div>
  );
}

export default GameBox;
