import GameBox from "../components/GameBox";
import styles from "./HomePage.module.css";
import rpsImage from "../assets/rps.png";
import ticTacToeImage from "../assets/tictactoe.png";
import Pikachu from "../assets/pikachu.png";

function HomePage() {
  return (
    <div>
      <h1>Mini Games</h1>
      <div className={styles.games}>
        <GameBox gamepic={rpsImage}>
          <p>
            Challenge the computer in this timeless game of strategy and luck
          </p>
        </GameBox>
        <GameBox gamepic={ticTacToeImage}>
          <p>
            Classic 3x3 battle against your friend. Can you find the perfect
            strategy?
          </p>
        </GameBox>
        <GameBox gamepic={Pikachu}>
          <p>Pokemon memory game</p>
        </GameBox>
      </div>
    </div>
  );
}

export default HomePage;
