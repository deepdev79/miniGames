import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Rps from "./pages/Rps";
import TicTacToe from "./pages/TicTacToe";
import PokemonMemory from "./pages/PokemonMemory";
import SimonSays from "./pages/SimonSays";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rps" element={<Rps />} />
        <Route path="/ttt" element={<TicTacToe />} />
        <Route path="/pokemon" element={<PokemonMemory />} />
        <Route path="/simonsays" element={<SimonSays />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
