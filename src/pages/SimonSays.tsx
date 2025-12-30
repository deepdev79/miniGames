import { motion } from "motion/react";
import styles from "./SimonSays.module.css";
import { Children, useReducer, useState } from "react";

const initialState = {
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
  userTurn: false,
  currentUserStep: 0,
};

function reducer(state, action) {
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
      };
    default:
      return state;
  }
}

function SimonSays() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [flashId, setFlashId] = useState<Number[]>([]);
  const [endGame, setEndGame] = useState(false);
  const [checkCounter, setCheckCounter] = useState(0);

  function handleUserClick(clickedId) {
    memoryFlash(clickedId);
    if (clickedId === state.sequence[checkCounter]) console.log("success");
    else console.log("fail");

    setCheckCounter((s) => s + 1);

    // if (clickedId === flashId[checkCounter]) console.log("success");
    // else console.log("fail");
  }

  function gameStart() {
    let sequenceToPlay = [];
    for (let i = 0; i < 5; i++) {
      const rng = Math.floor(Math.random() * 4) + 1;
      dispatch({ type: "addNewSeq", payload: rng });
      sequenceToPlay = [...state.sequence, rng];
    }
    playSequence(sequenceToPlay);
  }
  async function playSequence(sequence: []) {
    for (const buttonId of sequence) {
      memoryFlash(buttonId);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
  }
  function memoryFlash(id) {
    dispatch({ type: "flash", payload: id });

    setTimeout(function () {
      dispatch({ type: "unFlash", payload: id });
    }, 400);
  }

  return (
    <div>
      <div className={styles.gamebox}>
        {state.buttons.map((btn) => (
          <Button
            onClick={() => handleUserClick(btn.id)}
            bgColor={btn.bgColor}
            key={btn.id}
          ></Button>
        ))}
      </div>
      <Button bgColor={"#ffff"} onClick={() => gameStart()}>
        Start
      </Button>
      <Button bgColor={"#ffff"} onClick={() => setEndGame(true)}>
        End
      </Button>
    </div>
  );
}

function Button({ children, bgColor, onClick }) {
  return (
    <motion.button style={{ backgroundColor: bgColor }} onClick={onClick}>
      {children}
    </motion.button>
  );
}
export default SimonSays;
