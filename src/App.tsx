import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import HomePage from "./pages/HomePage";
import Rps from "./pages/Rps";
import TicTacToe from "./pages/TicTacToe";
import PokemonMemory from "./pages/PokemonMemory";
import SimonSays from "./pages/SimonSays";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import Snake from "./pages/Snake";
import Credits from "./pages/Credits";

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransistion>
              <HomePage />
            </PageTransistion>
          }
        />
        <Route
          path="/rps"
          element={
            <PageTransistion>
              <Rps />
            </PageTransistion>
          }
        />
        <Route
          path="/ttt"
          element={
            <PageTransistion>
              <TicTacToe />
            </PageTransistion>
          }
        />
        <Route
          path="/pokemon"
          element={
            <PageTransistion>
              <PokemonMemory />
            </PageTransistion>
          }
        />
        <Route
          path="/simonsays"
          element={
            <PageTransistion>
              <SimonSays />
            </PageTransistion>
          }
        />
        <Route
          path="/snake"
          element={
            <PageTransistion>
              <Snake />
            </PageTransistion>
          }
        />
        <Route
          path="/credits"
          element={
            <PageTransistion>
              <Credits />
            </PageTransistion>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
interface PageTransistionProps {
  children: ReactNode;
}

function PageTransistion({ children }: PageTransistionProps) {
  return (
    <motion.main
      className="page"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}

export default App;
