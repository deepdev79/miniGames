import { motion } from "motion/react";
import styles from "./SimonSays.module.css";
import { useEffect, useReducer, type ReactNode } from "react";
import { playTone, playErrorSound } from "../utils/simonSaysSounds";
import GoHome from "../components/GoHome";

interface Button {
  id: number;
  bgColor: string;
  orgBgColor: string;
  popColor: string;
}

interface State {
  buttons: Button[];
  sequence: number[];
  userTurn: boolean;
  gameStatus: boolean;
  score: number;
  highScore: number;
  currentUserStep: number;
  handleStartButton: boolean;
  handleGameButton: boolean;
}

type Action =
  | { type: "flash"; payload: number }
  | { type: "unFlash"; payload: number }
  | { type: "setUserTurn"; payload: boolean }
  | { type: "addNewSeq"; payload: number }
  | { type: "userClick"; payload: number }
  | { type: "endGame" }
  | { type: "reset" };

const initialState: State = {
  buttons: [
    {
      id: 1,
      bgColor: "#f3f711ff",
      orgBgColor: "#f3f711ff",
      popColor: "#868807ff",
    },
    {
      id: 2,
      bgColor: "#e60d0dff",
      orgBgColor: "#e60d0dff",
      popColor: "#690404ff",
    },
    {
      id: 3,
      bgColor: "#0606f8ff",
      orgBgColor: "#0606f8ff",
      popColor: "#040479ff",
    },
    {
      id: 4,
      bgColor: "#06bd31ff",
      orgBgColor: "#06bd31ff",
      popColor: "#025214ff",
    },
  ],
  sequence: [],
  gameStatus: false,
  userTurn: false,
  currentUserStep: 0,
  score: 0,
  highScore: 0,
  handleStartButton: false,
  handleGameButton: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "flash":
      return {
        ...state,
        buttons: state.buttons.map((btn) =>
          btn.id === action.payload ? { ...btn, bgColor: btn.popColor } : btn
        ),
      };
    case "unFlash":
      return {
        ...state,
        buttons: state.buttons.map((btn) =>
          btn.id === action.payload ? { ...btn, bgColor: btn.orgBgColor } : btn
        ),
      };
    case "addNewSeq":
      return {
        ...state,
        sequence: [...state.sequence, action.payload],
        currentUserStep: 0,
        score: state.sequence.length,
        userTurn: false,
      };
    case "setUserTurn":
      return {
        ...state,
        userTurn: action.payload,
        handleGameButton: !state.handleGameButton,
      };
    case "userClick":
      const isCorrect =
        state.sequence[state.currentUserStep] === action.payload;
      if (!isCorrect) {
        return {
          ...initialState,
          highScore:
            state.highScore < state.score ? state.score : state.highScore,
          handleStartButton: false,
        };
      }
      return {
        ...state,
        currentUserStep: state.currentUserStep + 1,
        userTurn: state.currentUserStep + 1 !== state.sequence.length,
      };

    case "endGame":
      return {
        ...initialState,
        highScore:
          state.highScore < state.score ? state.score : state.highScore,
        handleStartButton: false,
      };
    case "reset":
      return {
        ...initialState,
        highScore: state.highScore,
        handleStartButton: true,
      };
    default:
      return state;
  }
}

function SimonSays() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleResetButton() {
    dispatch({ type: "reset" });
    setTimeout(() => gameStart(true), 300);
  }

  function startGame() {
    dispatch({ type: "reset" });
    setTimeout(() => gameStart(true), 100);
  }

  async function gameStart(resetPattern: boolean = false) {
    const rng = Math.floor(Math.random() * 4) + 1;
    dispatch({ type: "addNewSeq", payload: rng });
    const currentSequence = resetPattern ? [] : state.sequence;
    const sequenceToPlay = [...currentSequence, rng];
    await playSequence(sequenceToPlay);
  }
  async function playSequence(sequence: number[]) {
    dispatch({ type: "setUserTurn", payload: false });
    await new Promise((resolve) => setTimeout(resolve, 500));
    for (const buttonId of sequence) {
      memoryFlash(buttonId);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
    dispatch({ type: "setUserTurn", payload: true });
  }
  function memoryFlash(id: number) {
    playTone(id);
    dispatch({ type: "flash", payload: id });

    setTimeout(function () {
      dispatch({ type: "unFlash", payload: id });
    }, 400);
  }

  function handleUserClick(clickedId: number) {
    if (!state.userTurn) return;
    const expectedId = state.sequence[state.currentUserStep];
    if (clickedId === expectedId) {
      memoryFlash(clickedId);
      dispatch({ type: "userClick", payload: clickedId });
    } else {
      playErrorSound();
      dispatch({ type: "userClick", payload: clickedId });
    }
  }
  useEffect(() => {
    if (
      state.sequence.length > 0 &&
      state.currentUserStep === state.sequence.length
    ) {
      const timer = setTimeout(() => {
        gameStart();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.currentUserStep, state.sequence.length]);

  return (
    <div className={styles.rootCopy}>
      <GoHome />
      <h1 style={{ marginBottom: "20px" }}>Welcome</h1>
      <div className={styles.scores}>
        <p>Score: {state.score}</p>
        <p>HighScore: {state.highScore}</p>
      </div>
      <div className={styles.gamebox}>
        {state.buttons.map((btn) => (
          <Button
            onClick={() => handleUserClick(btn.id)}
            bgColor={btn.bgColor}
            key={btn.id}
            buttonStatus={state.handleGameButton}
          ></Button>
        ))}
      </div>
      <div className={styles.options}>
        <Button
          classProp={state.handleStartButton ? styles.btnDisabled : styles.btn}
          bgColor={"#fa6400"}
          onClick={startGame}
          buttonStatus={state.handleStartButton}
        >
          Start
        </Button>
        <Button
          classProp={state.handleStartButton ? styles.btn : styles.btnDisabled}
          bgColor={"#fa6400"}
          onClick={() => dispatch({ type: "endGame" })}
          buttonStatus={!state.handleStartButton}
        >
          End
        </Button>
        <Button
          classProp={state.handleStartButton ? styles.btn : styles.btnDisabled}
          bgColor={"#fa6400"}
          onClick={handleResetButton}
          buttonStatus={!state.handleStartButton}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

interface ButtonProps {
  bgColor: string;
  children?: ReactNode;
  buttonStatus?: boolean;
  onClick: () => void;
  classProp?: string;
}

function Button({
  children,
  bgColor,
  onClick,
  buttonStatus,
  classProp,
}: ButtonProps) {
  return (
    <motion.button
      className={classProp}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
      disabled={buttonStatus}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
export default SimonSays;
