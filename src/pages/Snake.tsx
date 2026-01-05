import { useReducer } from "react";
import GoHome from "../components/GoHome";
import { styles } from "./Snake.module.css";

const initialState = {
  snake: [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
  ],
  food: { x: 5, y: 5 },
  direction: "up",
  isGameOver: false,
};

const GRID_SIZE = 20;
const GAMEGRID = Array.from({ length: GRID_SIZE }, () =>
  new Array(GRID_SIZE).fill("")
);

function reducer(state, action) {
  switch (action.type) {
    default:
      return state;
  }
}
function Snake() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <GoHome />
      <div className={styles.container}></div>
    </div>
  );
}

export default Snake;
