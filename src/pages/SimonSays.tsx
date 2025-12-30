import { motion } from "motion/react";
import styles from "./SimonSays.module.css";
import { useReducer } from "react";

const initialState = [
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
];

function reducer(state, action) {
  if (action.type === "flash") {
    return state.map((btn) => ({
      ...btn,
      bgColor: btn.id === action.payload ? btn.popColor : btn.bgColor,
    }));
  } else if (action.type === "unFlash") {
    return state.map((btn) => ({
      ...btn,
      bgColor: btn.id === action.payload ? btn.orgBgColor : btn.bgColor,
    }));
  }

  return state;
}

function SimonSays() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function memoryFlash() {
    const rng = Math.floor(Math.random() * 4) + 1;
    dispatch({ type: "flash", payload: rng });

    setTimeout(function () {
      dispatch({ type: "unFlash", payload: rng });
    }, 500);
  }

  return (
    <div>
      <div className={styles.gamebox}>
        {state.map((btn) => (
          <Button
            onClick={() => dispatch({ type: "click", payload: btn.id })}
            bgColor={btn.bgColor}
            key={btn.id}
          ></Button>
        ))}
      </div>
      <Button bgColor={"#ffff"} onClick={() => memoryFlash()}></Button>
    </div>
  );
}

function Button({ bgColor, onClick }) {
  return (
    <motion.button style={{ backgroundColor: bgColor }} onClick={onClick}>
      test
    </motion.button>
  );
}
export default SimonSays;
