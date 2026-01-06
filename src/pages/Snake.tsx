import { useEffect, useReducer, useState } from "react";
import GoHome from "../components/GoHome";
import styles from "./Snake.module.css";

const GRID_SIZE = 20;
const GAMEGRID = Array.from({ length: GRID_SIZE }, () =>
  new Array(GRID_SIZE).fill("")
);

const initialDirection = {
  direction: "ArrowRight",
  move: 1,
};

function directionReducer(state, action) {
  if (action.type === "ArrowUp" || action.type === "ArrowDown") {
    if (state.direction === "ArrowRight" || state.direction === "ArrowLeft")
      return {
        ...state,
        direction: action.type,
        move: action.type === "ArrowUp" ? -1 : 1,
      };
  }

  if (action.type === "ArrowRight" || action.type === "ArrowLeft") {
    if (state.direction === "ArrowUp" || state.direction === "ArrowDown")
      return {
        ...state,
        direction: action.type,
        move: action.type === "ArrowLeft" ? -1 : 1,
      };
  }

  return state;
}
const initialSnake = [
  [5, 5],
  [4, 5],
  [3, 5],
];
function Snake() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [snake, setSnake] = useState(initialSnake);
  const [{ direction, move }, directionDispatch] = useReducer(
    directionReducer,
    initialDirection
  );

  function isSnakeBody(xc: number, yc: number): boolean {
    return snake.some(([x, y]) => {
      return x === xc && y === yc;
    });
  }

  useEffect(() => {
    const handleSnakeDirection = (event) => {
      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
      ) {
        directionDispatch({ type: `${event.key}` });
      }
    };

    window.addEventListener("keydown", handleSnakeDirection);

    return () => {
      window.removeEventListener("keydown", handleSnakeDirection);
    };
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setSnake((prev) => {
        let newHead = [];
        if (direction === "ArrowRight" || direction === "ArrowLeft")
          newHead = [prev[0][0] + move, prev[0][1]];
        else newHead = [prev[0][0], prev[0][1] + move];
        if (
          newHead[0] < 0 ||
          newHead[0] >= GRID_SIZE ||
          newHead[1] < 0 ||
          newHead[1] >= GRID_SIZE
        ) {
          return initialSnake;
        }

        const newSnake = [newHead, ...prev.slice(0, -1)];
        return newSnake;
      });
    }, 1000);
    return () => clearInterval(moveInterval);
  }, [direction, move]);
  return (
    <div className={styles.mainContainer}>
      <GoHome />
      <p>Score</p>
      <div className={styles.container}>
        {GAMEGRID.map((row, yc) => {
          return row.map((cell, xc) => {
            return (
              <div
                className={`${styles.cell} ${
                  isSnakeBody(xc, yc) ? styles.snake : ""
                }`}
              ></div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default Snake;
