import { motion } from "motion/react";
import styles from "./SimonSays.module.css";
import { useReducer } from "react";

const initialState = [
  {
    id: 1,
    bgColor: "#f3f711ff",
  },
  {
    id: 2,
    bgColor: "#e60d0dff",
  },
  {
    id: 3,
    bgColor: "#0606f8ff",
  },
  {
    id: 4,
    bgColor: "#06bd31ff",
  },
];

function SimonSays() {
  const [{ changeColor }, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <div className={styles.gamebox}>
        {initialState.map((btn) => (
          <Button bgColor={btn.bgColor} key={btn.id}>
            Test
          </Button>
        ))}
      </div>
    </div>
  );
}

function Button({ bgColor }) {
  return (
    <motion.button style={{ backgroundColor: bgColor }}>test</motion.button>
  );
}
export default SimonSays;
