import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { lazy, Suspense } from "react";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Loading from "./components/Loading";
const Rps = lazy(() => import("./pages/Rps"));
const TicTacToe = lazy(() => import("./pages/TicTacToe"));
const PokemonMemory = lazy(() => import("./pages/PokemonMemory"));
const SimonSays = lazy(() => import("./pages/SimonSays"));
const Snake = lazy(() => import("./pages/Snake"));
const Credits = lazy(() => import("./pages/Credits"));

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
            <Suspense fallback={<Loading />}>
              <PageTransistion>
                <Rps />
              </PageTransistion>
            </Suspense>
          }
        />
        <Route
          path="/ttt"
          element={
            <Suspense fallback={<Loading />}>
              <PageTransistion>
                <TicTacToe />
              </PageTransistion>
            </Suspense>
          }
        />
        <Route
          path="/pokemon"
          element={
            <Suspense fallback={<Loading />}>
              <PageTransistion>
                <PokemonMemory />
              </PageTransistion>
            </Suspense>
          }
        />
        <Route
          path="/simonsays"
          element={
            <Suspense fallback={<Loading />}>
              <PageTransistion>
                <SimonSays />
              </PageTransistion>
            </Suspense>
          }
        />
        <Route
          path="/snake"
          element={
            <Suspense fallback={<Loading />}>
              <PageTransistion>
                <Snake />
              </PageTransistion>
            </Suspense>
          }
        />
        <Route
          path="/credits"
          element={
            <Suspense fallback={<Loading />}>
              <PageTransistion>
                <Credits />
              </PageTransistion>
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <PageTransistion>
              <PageNotFound />
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
