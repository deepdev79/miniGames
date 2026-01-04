import { useReducer } from "react";
import GoHome from "../components/GoHome";
import styles from "./TicTacToe.module.css";

interface State {
  board: (string | null)[];
  isXNext: boolean;
  winner: string | null;
}
type Action = { type: "move"; payload: number } | { type: "reset" };
const initialState = {
  board: Array(9).fill(null),
  isXNext: true,
  winner: null,
};

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "move":
      if (state.board[action.payload] || state.winner) return state;

      const newBoard = [...state.board];
      newBoard[action.payload] = state.isXNext ? "X" : "O";

      return {
        ...state,
        board: newBoard,
        isXNext: !state.isXNext,
        winner: calculateWinner(newBoard),
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function TicTacToe() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const status = state.winner
    ? `Winner: ${state.winner}`
    : `Next Player: ${state.isXNext ? "X" : "O"}`;

  return (
    <div>
      <GoHome />
      <h1>{status}</h1>
      <div className={styles.gamebox}>
        <ul className={styles.gameboard}>
          {state.board.map((value, index) => (
            <li
              className={styles.box}
              key={index}
              onClick={() => dispatch({ type: "move", payload: index })}
            >
              {value}
            </li>
          ))}
        </ul>
        <button
          className={styles.btn}
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset Board
        </button>
      </div>
    </div>
  );
}

export default TicTacToe;
