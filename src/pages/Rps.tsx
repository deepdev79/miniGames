import { useReducer, type ReactNode } from "react";
import styles from "./Rps.module.css";
import RockImage from "../assets/rps/rock.png";
import PaperImage from "../assets/rps/paper.png";
import ScissorImage from "../assets/rps/scissor.png";
import waitImage from "../assets/rps/wait.png";
import { motion } from "framer-motion";

const IMAGE_MAP: Record<string, string> = {
  Rock: RockImage,
  Paper: PaperImage,
  Scissors: ScissorImage,
  Wait: waitImage,
};

const initialState = {
  playerScore: 0,
  computerScore: 0,
  playerChoice: "Wait",
  computerChoice: "Wait",
};

function reducer(state, action) {
  if (action.type === "reset") return initialState;

  const choices = ["Rock", "Paper", "Scissors"];
  const playerMove = action.type;
  const computerMove = choices[Math.floor(Math.random() * 3)];

  let { playerScore, computerScore } = state;
  const result = gameLogic(playerMove, computerMove);
  if (result === "playerWin") playerScore++;
  if (result === "computerWin") computerScore++;

  return {
    playerScore,
    computerScore,
    playerChoice: playerMove,
    computerChoice: computerMove,
  };
}

function gameLogic(playerChoice: string, computerMove: string) {
  if (playerChoice === computerMove) return "draw";
  else if (
    (playerChoice === "Rock" && computerMove === "Paper") ||
    (playerChoice === "Paper" && computerMove === "Scissors") ||
    (playerChoice === "Scissors" && computerMove === "Rock")
  )
    return "computerWin";
  else if (
    (playerChoice === "Rock" && computerMove === "Scissors") ||
    (playerChoice === "Paper" && computerMove === "Rock") ||
    (playerChoice === "Scissors" && computerMove === "Paper")
  )
    return "playerWin";
}

function Rps() {
  const [
    { playerScore, computerScore, playerChoice, computerChoice },
    dispatch,
  ] = useReducer(reducer, initialState);
  return (
    <div>
      <h1>Welcome</h1>
      <h3>First to 5 wins the game</h3>
      <div className={styles.gamebox}>
        <p>Your Hand</p>
        <p>Computer Hand</p>
        <img src={IMAGE_MAP[playerChoice]} alt={playerChoice} />
        <img src={IMAGE_MAP[computerChoice]} alt={computerChoice} />
        <p>{playerScore}</p>
        <p>{computerScore}</p>
      </div>
      <div className={styles.options}>
        <Button onClick={() => dispatch({ type: "Rock" })}>Rock</Button>
        <Button onClick={() => dispatch({ type: "Paper" })}>Paper</Button>
        <Button onClick={() => dispatch({ type: "Scissors" })}>Scissors</Button>
      </div>
      <Button onClick={() => dispatch({ type: "reset" })}>Reset</Button>
    </div>
  );
}
interface ButtonProps {
  children: ReactNode;
}
function Button({ children, onClick }: ButtonProps) {
  return (
    <motion.button className="btn" onClick={onClick}>
      {children}
    </motion.button>
  );
}

export default Rps;
