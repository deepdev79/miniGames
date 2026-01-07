import { useEffect, useReducer, useState } from "react";
import GoHome from "../components/GoHome";
import styles from "./Snake.module.css";

const GRID_SIZE = 20;
const GAMEGRID = Array.from({ length: GRID_SIZE }, () =>
  new Array(GRID_SIZE).fill("")
);
type Direction = "ArrowRight" | "ArrowLeft" | "ArrowUp" | "ArrowDown";

type Coordinate = [number, number];
interface State {
  direction: Direction;
  snake: Coordinate[];
  food: Coordinate;
  score: number;
}

const initialState: State = {
  direction: "ArrowRight",
  snake: [
    [5, 5],
    [4, 5],
    [3, 5],
  ],
  food: generateFood(),
  score: 0,
};

function generateFood(): Coordinate {
  const x = Math.floor(Math.random() * GRID_SIZE);
  const y = Math.floor(Math.random() * GRID_SIZE);
  return [x, y];
}

type Action =
  | { type: "ArrowUp" }
  | { type: "ArrowDown" }
  | { type: "ArrowRight" }
  | { type: "ArrowLeft" }
  | { type: "reset" }
  | { type: "foodEncounter"; payload: Coordinate }
  | { type: "changeDirection"; payload: Coordinate };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ArrowUp":
    case "ArrowDown":
      const changeVerticalDirection =
        state.direction === "ArrowRight" || state.direction === "ArrowLeft";
      if (changeVerticalDirection)
        return {
          ...state,
          direction: action.type,
        };
      return state;
    case "ArrowLeft":
    case "ArrowRight":
      const changeHorizontalDirection =
        state.direction === "ArrowUp" || state.direction === "ArrowDown";
      if (changeHorizontalDirection)
        return {
          ...state,
          direction: action.type,
        };
      return state;
    case "foodEncounter":
      return {
        ...state,
        snake: [action.payload, ...state.snake],
        food: generateFood(),
        score: state.score + 1,
      };
    case "changeDirection":
      return { ...state, snake: [action.payload, ...state.snake.slice(0, -1)] };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function Snake() {
  const [{ direction, snake, food, score }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function isSnakeBody(xc: number, yc: number): boolean {
    return snake.some(([x, y]) => {
      return x === xc && y === yc;
    });
  }

  useEffect(() => {
    const handleSnakeDirection = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
      ) {
        dispatch({ type: `${event.key}` });
      }
    };

    window.addEventListener("keydown", handleSnakeDirection);

    return () => {
      window.removeEventListener("keydown", handleSnakeDirection);
    };
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      const currentHead = snake[0];
      let newHead: [number, number] = [0, 0];

      switch (direction) {
        case "ArrowRight":
          newHead = [currentHead[0] + 1, currentHead[1]];
          break;
        case "ArrowLeft":
          newHead = [currentHead[0] - 1, currentHead[1]];
          break;
        case "ArrowUp":
          newHead = [currentHead[0], currentHead[1] - 1];
          break;
        case "ArrowDown":
          newHead = [currentHead[0], currentHead[1] + 1];
          break;
      }
      if (
        newHead[0] < 0 ||
        newHead[0] >= GRID_SIZE ||
        newHead[1] < 0 ||
        newHead[1] >= GRID_SIZE
      ) {
        dispatch({ type: "reset" });
        return;
      }

      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        console.log("Food eaten! Snake length:", snake.length + 1);
        dispatch({ type: "foodEncounter", payload: newHead });
      } else {
        dispatch({ type: "changeDirection", payload: newHead });
      }
    }, 1000);
    return () => clearInterval(moveInterval);
  }, [snake, direction, food]);
  return (
    <div className={styles.mainContainer}>
      <GoHome />
      <p>Score:{score}</p>
      <div className={styles.container}>
        {GAMEGRID.map((row, yc) => {
          return row.map((cell, xc) => {
            return (
              <div
                className={`${styles.cell} ${
                  isSnakeBody(xc, yc) ? styles.snake : ""
                } ${food[0] === xc && food[1] === yc ? styles.prey : ""}`}
              ></div>
            );
          });
        })}
      </div>
    </div>
  );
}

export default Snake;
