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
type Choice = "Rock" | "Paper" | "Scissors" | "Wait";

interface State {
  playerScore: number;
  computerScore: number;
  playerChoice: Choice;
  computerChoice: Choice;
  buttonStatus: boolean;
  message: string;
}
const initialState: State = {
  playerScore: 0,
  computerScore: 0,
  playerChoice: "Wait",
  computerChoice: "Wait",
  buttonStatus: false,
  message: "First to 5 wins the game",
};

type Action = { type: "Rock" | "Paper" | "Scissors" } | { type: "reset" };

function reducer(state: State, action: Action): State {
  if (action.type === "reset") return initialState;

  const choices: Choice[] = ["Rock", "Paper", "Scissors"];
  const playerMove: Choice = action.type;
  const computerMove: Choice = choices[Math.floor(Math.random() * 3)];

  let { playerScore, computerScore } = state;
  const result = gameLogic(playerMove, computerMove);
  if (result === "playerWin") playerScore++;
  if (result === "computerWin") computerScore++;

  const baseState = {
    playerScore,
    computerScore,
    playerChoice: playerMove,
    computerChoice: computerMove,
  };

  if (playerScore === 5)
    return {
      ...baseState,
      buttonStatus: true,
      message: "Congrats 🥳 You win",
    };
  else if (computerScore === 5)
    return {
      ...baseState,
      buttonStatus: true,
      message: "😢 You lose",
    };

  return {
    ...state,
    ...baseState,
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
    {
      playerScore,
      computerScore,
      playerChoice,
      computerChoice,
      buttonStatus,
      message,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  return (
    <div>
      <h1>Welcome</h1>
      <h3>{message}</h3>
      <div className={styles.gamebox}>
        <p>Your Hand</p>
        <p>Computer Hand</p>
        <img src={IMAGE_MAP[playerChoice]} alt={playerChoice} />
        <img src={IMAGE_MAP[computerChoice]} alt={computerChoice} />
        <p>{playerScore}</p>
        <p>{computerScore}</p>
      </div>
      <div className={styles.options}>
        <Button
          onClick={() => dispatch({ type: "Rock" })}
          buttonStatus={buttonStatus}
        >
          Rock
        </Button>
        <Button
          onClick={() => dispatch({ type: "Paper" })}
          buttonStatus={buttonStatus}
        >
          Paper
        </Button>
        <Button
          onClick={() => dispatch({ type: "Scissors" })}
          buttonStatus={buttonStatus}
        >
          Scissors
        </Button>
      </div>
      <Button onClick={() => dispatch({ type: "reset" })}>
        {buttonStatus ? "Play Again" : "Reset"}
      </Button>
    </div>
  );
}
interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  buttonStatus?: boolean;
}

const buttonVariants = {
  active: {
    scale: 1,
    opacity: 1,
    filter: "grayscale(0%)",
    backgroundColor: "#fcfcfd",
  },
  hover: { scale: 1.1, backgroundColor: "#00b371ff" },
  tap: { scale: 0.95 },
  disabled: {
    scale: 1,
    opacity: 0.5,
    filter: "grayscale(100%)",
    cursor: "not-allowed",
    backgroundColor: "#fcfcfd",
  },
};

function Button({ children, onClick, buttonStatus }: ButtonProps) {
  return (
    <motion.button
      className={styles.btn}
      variants={buttonVariants}
      whileHover={buttonStatus ? {} : "hover"}
      whileTap={buttonStatus ? undefined : "tap"}
      animate={buttonStatus ? "disabled" : "active"}
      initial={false}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      disabled={buttonStatus}
    >
      {children}
    </motion.button>
  );
}

export default Rps;
