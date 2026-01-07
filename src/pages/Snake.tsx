import { useEffect, useReducer } from "react";
import GoHome from "../components/GoHome";
import styles from "./Snake.module.css";

const GRID_SIZE = 20;
const GAMEGRID = Array.from({ length: GRID_SIZE }, () =>
  new Array(GRID_SIZE).fill("")
);
type Direction = "ArrowRight" | "ArrowLeft" | "ArrowUp" | "ArrowDown";
// type Difficulty = "Rookie" | "Easy" | "Medium" | "Hard";
// type Speed = Record<Difficulty, number>;
type Coordinate = [number, number];
interface State {
  direction: Direction;
  snake: Coordinate[];
  food: Coordinate;
  score: number;
  highScore: number;
  speed: number;
}

const initialState: State = {
  direction: "ArrowRight",
  snake: [
    [5, 5],
    [4, 5],
    [3, 5],
  ],
  food: generateFood([
    [5, 5],
    [4, 5],
    [3, 5],
  ]),
  score: 0,
  highScore: 0,
  speed: 500,
};

function generateFood(snake: Coordinate[]): Coordinate {
  let newFood: Coordinate;
  let isOnSnake: boolean;

  do {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    newFood = [x, y];
    isOnSnake = snake.some(([sx, sy]) => sx === x && sy === y);
  } while (isOnSnake);

  return newFood;
}
type Action =
  | { type: "ArrowUp" }
  | { type: "ArrowDown" }
  | { type: "ArrowRight" }
  | { type: "ArrowLeft" }
  | { type: "reset"; payload?: number }
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
      const newSnake = [action.payload, ...state.snake];
      return {
        ...state,
        snake: newSnake,
        food: generateFood(newSnake),
        score: state.score + 1,
      };
    case "changeDirection":
      return { ...state, snake: [action.payload, ...state.snake.slice(0, -1)] };
    case "reset":
      return {
        ...initialState,
        highScore:
          state.highScore < state.score ? state.score : state.highScore,
        speed: action.payload ? action.payload : state.speed,
      };
    default:
      return state;
  }
}

function Snake() {
  const [{ direction, snake, food, score, highScore, speed }, dispatch] =
    useReducer(reducer, initialState);

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
        newHead[1] >= GRID_SIZE ||
        snake.some(([x, y]) => {
          return newHead[0] === x && newHead[1] === y;
        })
      ) {
        dispatch({ type: "reset" });
        return;
      }

      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        dispatch({ type: "foodEncounter", payload: newHead });
      } else {
        dispatch({ type: "changeDirection", payload: newHead });
      }
    }, speed);
    return () => clearInterval(moveInterval);
  }, [snake, direction, food, speed]);
  return (
    <div className={styles.mainContainer}>
      <GoHome />
      <h1>Welcome</h1>
      <div className={styles.scores}>
        <p>Score:{score}</p>
        <p>High Score:{highScore}</p>
      </div>
      <div className={styles.container}>
        {GAMEGRID.map((row, yc) => {
          return row.map((cell, xc) => {
            return (
              <div
                key={`${xc}-${yc}`}
                className={`${styles.cell} ${
                  isSnakeBody(xc, yc) ? styles.snake : ""
                } ${food[0] === xc && food[1] === yc ? styles.prey : ""}`}
              ></div>
            );
          });
        })}
      </div>
      <div className={styles.options}>
        <button
          className={styles.btn}
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </button>
        <div className={styles.difficulty}>
          <p>Difficulty:</p>
          <button
            className={styles.btn}
            onClick={() => dispatch({ type: "reset", payload: 1000 })}
          >
            Rookie
          </button>
          <button
            className={styles.btn}
            onClick={() => dispatch({ type: "reset", payload: 500 })}
          >
            Easy
          </button>
          <button
            className={styles.btn}
            onClick={() => dispatch({ type: "reset", payload: 200 })}
          >
            Medium
          </button>
          <button
            className={styles.btn}
            onClick={() => dispatch({ type: "reset", payload: 100 })}
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Snake;
