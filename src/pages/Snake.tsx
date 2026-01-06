import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import GoHome from "../components/GoHome";
import styles from "./Snake.module.css";

const GRID_SIZE = 20;
const GAMEGRID = Array.from({ length: GRID_SIZE }, () =>
  new Array(GRID_SIZE).fill("")
);

const initialDirection = {
  direction: "ArrowRight",
  move: 1,
  food: [],
};

// function directionReducer(state, action) {
//   if (action.type === "ArrowUp" || action.type === "ArrowDown") {
//     if (state.direction === "ArrowRight" || state.direction === "ArrowLeft")
//       return {
//         ...state,
//         direction: action.type,
//         move: action.type === "ArrowUp" ? -1 : 1,
//       };
//   }

//   if (action.type === "ArrowRight" || action.type === "ArrowLeft") {
//     if (state.direction === "ArrowUp" || state.direction === "ArrowDown")
//       return {
//         ...state,
//         direction: action.type,
//         move: action.type === "ArrowLeft" ? -1 : 1,
//       };
//   }

//   return state;
// }
function directionReducer(state, action) {
  switch (action.type) {
    case "ArrowUp":
    case "ArrowDown":
      const changeVerticalDirection =
        state.direction === "ArrowRight" || state.direction === "ArrowLeft";
      if (changeVerticalDirection)
        return {
          ...state,
          direction: action.type,
          move: action.type === "ArrowUp" ? -1 : 1,
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
          move: action.type === "ArrowLeft" ? -1 : 1,
        };
      return state;
    default:
      return state;
  }
}

const initialSnake = [
  [5, 5],
  [4, 5],
  [3, 5],
];
function Snake() {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(generateFood());
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
    const handleSnakeDirection = (event: KeyboardEvent) => {
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

  function generateFood() {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    return [x, y];
  }

  const directionRef = useRef(direction);
  const moveRef = useRef(move);

  // useEffect(() => {

  //   const moveInterval = setInterval(() => {
  //     setSnake((prev) => {
  //       let newHead = [];
  //       if (direction === "ArrowRight" || direction === "ArrowLeft")
  //         newHead = [prev[0][0] + move, prev[0][1]];
  //       else newHead = [prev[0][0], prev[0][1] + move];

  //       if (
  //         newHead[0] < 0 ||
  //         newHead[0] >= GRID_SIZE ||
  //         newHead[1] < 0 ||
  //         newHead[1] >= GRID_SIZE
  //       ) {
  //         return initialSnake;
  //       }

  //       if (
  //         newHead[0] === foodRef.current[0] &&
  //         newHead[1] === foodRef.current[1]
  //       ) {
  //         console.log("Food eaten! Snake length:", prev.length + 1);
  //         foodRef.current = generateFood();
  //         return [newHead, ...prev];
  //       }
  //       return [newHead, ...prev.slice(0, -1)];
  //     });
  //   }, 1000);
  //   return () => clearInterval(moveInterval);
  // }, [direction, move]);
  useEffect(() => {
    const moveInterval = setInterval(() => {
      const currentHead = snake[0];
      let newHead = [];

      if (direction === "ArrowRight" || direction === "ArrowLeft")
        newHead = [currentHead[0] + move, currentHead[1]];
      else newHead = [currentHead[0], currentHead[1] + move];

      if (
        newHead[0] < 0 ||
        newHead[0] >= GRID_SIZE ||
        newHead[1] < 0 ||
        newHead[1] >= GRID_SIZE
      ) {
        setSnake(initialSnake);
        return;
      }

      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        console.log("Food eaten! Snake length:", snake.length + 1);

        setFood(generateFood());
        setSnake([newHead, ...snake]);
      } else {
        setSnake([newHead, ...snake.slice(0, -1)]);
      }
    }, 1000);
    return () => clearInterval(moveInterval);
  }, [snake, direction, move, food]);
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

// // 1. Change food to state for reactivity
// const [food, setFood] = useState(generateFood());

// // 2. Optimized Interval logic
// useEffect(() => {
//   const moveInterval = setInterval(() => {
//     setSnake((prev) => {
//       const head = prev[0];
//       let newHead;

//       // Calculate new head based on current direction/move
//       if (direction === "ArrowRight" || direction === "ArrowLeft") {
//         newHead = [head[0] + move, head[1]];
//       } else {
//         newHead = [head[0], head[1] + move];
//       }

//       // 1. Check Wall Collision
//       if (
//         newHead[0] < 0 || newHead[0] >= GRID_SIZE ||
//         newHead[1] < 0 || newHead[1] >= GRID_SIZE
//       ) {
//         return initialSnake;
//       }

//       // 2. Check Self Collision (Recommended)
//       if (prev.some(([x, y]) => x === newHead[0] && y === newHead[1])) {
//         return initialSnake;
//       }

//       // 3. Check Food Collision
//       const ateFood = newHead[0] === food[0] && newHead[1] === food[1];

//       if (ateFood) {
//         // Move food generation OUTSIDE the return to trigger correctly
//         setFood(generateFood());
//         return [newHead, ...prev]; // Grow: add head, keep all prev segments
//       }

//       // Normal move: add head, remove tail
//       return [newHead, ...prev.slice(0, -1)];
//     });
//   }, 200); // 1000ms is very slow for Snake, try 200ms!

//   return () => clearInterval(moveInterval);
// }, [direction, move, food]); // Add food to dependencies so interval sees latest position
