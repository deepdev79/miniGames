import GameBox from "../components/GameBox";
import styles from "./HomePage.module.css";
import rpsImage from "../assets/rps.png";
import ticTacToeImage from "../assets/tictactoe.png";
import Pikachu from "../assets/pikachu.png";
import simonSaysImage from "../assets/ss.png";
import snake from "../assets/snake.jpg";

import { motion } from "motion/react";
import Footer from "../components/Footer";

function HomePage() {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to Mini Games</h1>
      <motion.div
        className={styles.games}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <GameBox variants={item} gamepic={rpsImage} path="/rps">
          <p>
            <span>Rock Paper Scissors</span>
            Challenge the computer in this timeless game of strategy and luck
          </p>
        </GameBox>
        <GameBox variants={item} gamepic={ticTacToeImage} path="/ttt">
          <p>
            <span>Tic Tac Toe</span>
            Classic 3x3 battle against your friend. Can you find the perfect
            strategy?
          </p>
        </GameBox>
        <GameBox variants={item} gamepic={Pikachu} path="/pokemon">
          <p>
            <span>Pokemon Memory</span>can you pick every card without ever
            hitting the same one twice?
          </p>
        </GameBox>
        <GameBox variants={item} gamepic={simonSaysImage} path="/simonsays">
          <p>
            <span>Simon Says</span>
            Test your focus and follow the rhythm in this vibrant challenge of
            memory and patterns
          </p>
        </GameBox>
        <GameBox variants={item} gamepic={snake} path="/snake">
          <p>
            <span>Classic Snake</span>Eat, grow, and survive—just don't bite
            your own tail
          </p>
        </GameBox>
      </motion.div>
      <Footer />
    </div>
  );
}

export default HomePage;
