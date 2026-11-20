"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowDown, FiArrowLeft, FiArrowRight, FiArrowUp } from "react-icons/fi";
import { useI18n } from "@/i18n/I18nProvider";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 }; // Moving UP initially
const SPEED = 120; // ms per tick
const KEY_DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};
const TOUCH_CONTROLS = [
  { key: "ArrowUp", labelKey: "up", Icon: FiArrowUp, area: "col-start-2" },
  { key: "ArrowLeft", labelKey: "left", Icon: FiArrowLeft, area: "col-start-1 row-start-2" },
  { key: "ArrowDown", labelKey: "down", Icon: FiArrowDown, area: "col-start-2 row-start-2" },
  { key: "ArrowRight", labelKey: "right", Icon: FiArrowRight, area: "col-start-3 row-start-2" },
];

export default function SnakeGame() {
  const { t } = useI18n();
  const g = t.games.snake;
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  // Use a ref to store the latest direction to prevent quick double-turn self-collisions
  const directionRef = useRef(INITIAL_DIRECTION);

  // A reversal into the snake's own neck is ignored
  const steer = useCallback((next) => {
    const { x, y } = directionRef.current;
    if (next.x !== -x || next.y !== -y) setDirection(next);
  }, []);

  const generateFood = useCallback((currentSnake) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // eslint-disable-next-line no-loop-func
      const isOnSnake = currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setFood(generateFood(INITIAL_SNAKE));
  };

  const checkCollision = (head, currentSnake) => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // Self collision
    for (let i = 1; i < currentSnake.length; i++) {
        if (head.x === currentSnake[i].x && head.y === currentSnake[i].y) {
            return true;
        }
    }
    return false;
  };

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const currentDir = directionRef.current;
        const newHead = { x: head.x + currentDir.x, y: head.y + currentDir.y };

        if (checkCollision(newHead, prevSnake)) {
          setGameOver(true);
          setHighScore((prev) => Math.max(prev, score));
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        return newSnake;
      });
    };

    const gameLoop = setInterval(moveSnake, SPEED);
    return () => clearInterval(gameLoop);
  }, [food, gameOver, isPaused, score, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Focused links and buttons keep their own Space and Enter behaviour
      if ((e.key === " " || e.key === "Enter") && e.target.closest("a, button")) return;

      // Prevent default scrolling only while the game owns the keyboard
      if (!isPaused && !gameOver && e.key in KEY_DIRECTIONS) e.preventDefault();
      if (e.key === " " && !gameOver) e.preventDefault();

      if (e.key in KEY_DIRECTIONS) steer(KEY_DIRECTIONS[e.key]);

      if (e.key === " " || e.key === "Enter") {
          if (gameOver) resetGame();
          else setIsPaused((p) => !p);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver, isPaused, steer]);

  // Update ref when state changes
  useEffect(() => {
      directionRef.current = direction;
  }, [direction]);

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-2xl shadow-xl border border-line flex flex-col items-center w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-ink mb-6 font-mono text-center tracking-wider">
        {g.title}
      </h2>

      <div className="flex justify-between w-full mb-4 px-2">
        <div className="text-muted font-mono text-lg">
          {g.score}: <span className="text-zellige font-bold">{score}</span>
        </div>
        <div className="text-muted font-mono text-lg">
          {g.best}: <span className="text-accent font-bold">{highScore}</span>
        </div>
      </div>

      <div dir="ltr" className="relative bg-bg border-4 border-line rounded-lg overflow-hidden shadow-inner">
        {/* Game Grid */}
        <div
          className="grid gap-[1px] bg-line"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            width: "min(300px, 80vw)",
            height: "min(300px, 80vw)",
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);

            const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={i}
                className={`w-full h-full ${
                  isHead
                    ? "bg-zellige rounded-sm"
                    : isSnake
                    ? "bg-zellige/70 rounded-sm"
                    : isFood
                    ? "bg-accent-fill rounded-full"
                    : "bg-transparent"
                }`}
              />
            );
          })}
        </div>

        {/* Overlays */}
        {(gameOver || isPaused) && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
            {gameOver ? (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                <h3 className="text-3xl font-bold text-red-500 mb-2">{g.gameOver}</h3>
                <button
                  onClick={resetGame}
                  className="px-6 py-2 bg-accent-fill hover:opacity-90 text-on-accent font-bold rounded-full transition"
                >
                  {g.playAgain}
                </button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-accent-fill hover:opacity-90 text-on-accent font-bold rounded-full transition"
                >
                  {g.start}
                </button>
                <p className="mt-4 px-4 text-sm text-white/80">{g.hint}</p>
              </motion.div>
            )}
          </div>
        )}
      </div>

      <div dir="ltr" className="mt-5 grid grid-cols-3 gap-2 [@media(hover:hover)]:hidden">
        {TOUCH_CONTROLS.map(({ key, labelKey, Icon, area }) => (
          <button
            key={key}
            type="button"
            aria-label={g[labelKey]}
            onPointerDown={() => steer(KEY_DIRECTIONS[key])}
            className={`grid size-14 place-items-center rounded-xl border border-line bg-surface-2 text-ink active:bg-accent-fill active:text-on-accent ${area}`}
          >
            <Icon className="size-6" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="mt-6 hidden text-center text-muted text-xs [@media(hover:hover)]:block">
        {g.pausePre} <span className="text-ink-soft font-mono border border-line px-1 rounded">{g.space}</span> {g.pausePost}
      </div>
    </div>
  );
}
