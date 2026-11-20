"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fmt } from "@/i18n/format";
import { useI18n } from "@/i18n/I18nProvider";

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6], // Diagonals
];

export default function TicTacToe() {
  const { t } = useI18n();
  const g = t.games.tictactoe;
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isVsRobot, setIsVsRobot] = useState(true);
  const [isRobotThinking, setIsRobotThinking] = useState(false);

  const calculateWinner = (squares) => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  };

  const winInfo = calculateWinner(board);
  const winner = winInfo?.winner;
  const winningLine = winInfo?.line || [];
  const isDraw = !winner && board.every((square) => square !== null);

  // Minimax Algorithm for unbeatable AI
  const minimax = (squares, depth, isMaximizing) => {
    const result = calculateWinner(squares);
    if (result) {
      if (result.winner === "O") return 10 - depth;
      if (result.winner === "X") return depth - 10;
    }
    if (squares.every((square) => square !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = "O";
          let score = minimax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = "X";
          let score = minimax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (squares) => {
    // If it's the very first move of the game, take a corner or center instantly
    const emptyCount = squares.filter((s) => s === null).length;
    if (emptyCount === 9 || emptyCount === 8) {
      const bestInitialMoves = [0, 2, 4, 6, 8];
      for (let move of bestInitialMoves) {
        if (!squares[move]) return move;
      }
    }

    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        squares[i] = "O";
        let score = minimax(squares, 0, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  useEffect(() => {
    // Robot's turn (Player O)
    if (isVsRobot && !isXNext && !winner && !isDraw) {
      setIsRobotThinking(true);
      const timer = setTimeout(() => {
        const bestMoveIndex = getBestMove([...board]);
        if (bestMoveIndex !== -1) {
          const newBoard = [...board];
          newBoard[bestMoveIndex] = "O";
          setBoard(newBoard);
          setIsXNext(true);
        }
        setIsRobotThinking(false);
      }, 600); // Artificial delay to simulate thinking
      return () => clearTimeout(timer);
    }
  }, [isXNext, isVsRobot, board, winner, isDraw]);

  const handleClick = (index) => {
    if (board[index] || winner || isRobotThinking) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setIsRobotThinking(false);
  };

  const toggleMode = (vsRobot) => {
    if (vsRobot !== isVsRobot) {
      setIsVsRobot(vsRobot);
      resetGame();
    }
  };

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-2xl shadow-xl border border-line flex flex-col items-center w-full max-w-sm mx-auto">
      <h2 className="text-3xl font-bold text-ink mb-4 font-mono text-center tracking-wider">
        {g.title}
      </h2>

      {/* Mode Selector */}
      <div dir="ltr" className="flex bg-bg rounded-lg p-1 mb-6 border border-line w-full relative">
        <button
          onClick={() => toggleMode(true)}
          className={`flex-1 py-1.5 text-sm font-semibold z-10 transition-colors duration-300 ${
            isVsRobot ? "text-on-accent" : "text-muted hover:text-ink"
          }`}
        >
          {g.vsRobot}
        </button>
        <button
          onClick={() => toggleMode(false)}
          className={`flex-1 py-1.5 text-sm font-semibold z-10 transition-colors duration-300 ${
            !isVsRobot ? "text-on-accent" : "text-muted hover:text-ink"
          }`}
        >
          {g.vsPlayer}
        </button>
        {/* Animated Pill Background */}
        <motion.div
          layout
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-accent-fill rounded-md z-0 shadow-sm"
          animate={{ x: isVsRobot ? 2 : "calc(100% + 4px)" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </div>

      <div className="flex justify-between items-center w-full mb-6 text-xl">
        <div
          className={`font-semibold flex flex-col items-center transition-opacity duration-300 ${
            isXNext && !winner && !isDraw ? "opacity-100" : "opacity-30"
          }`}
        >
          <span className="text-accent text-2xl">X</span>
          <span className="text-xs text-muted uppercase tracking-widest mt-1">{g.player1}</span>
        </div>
        <div className="text-muted font-bold text-sm">{g.vs}</div>
        <div
          className={`font-semibold flex flex-col items-center transition-opacity duration-300 ${
            !isXNext && !winner && !isDraw ? "opacity-100" : "opacity-30"
          }`}
        >
          <span className="text-zellige text-2xl">O</span>
          <span className="text-xs text-muted uppercase tracking-widest mt-1">
            {isVsRobot ? (isRobotThinking ? g.thinking : g.robot) : g.player2}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8 w-full max-w-[280px]">
        {board.map((symbol, index) => {
          const isWinningSquare = winningLine.includes(index);
          return (
            <motion.button
              key={index}
              onClick={() => handleClick(index)}
              className={`h-24 w-24 sm:w-20 sm:h-20 bg-bg border-2 rounded-xl flex items-center justify-center text-4xl sm:text-5xl font-bold transition-all shadow-inner focus:outline-none ${
                isWinningSquare
                  ? "border-zellige font-mono shadow-lg scale-105 z-10"
                  : "border-line hover:border-line-strong"
              } ${isRobotThinking && !symbol ? "opacity-70 cursor-wait" : ""}`}
              whileHover={{ scale: symbol || winner || isRobotThinking ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!!symbol || !!winner || isRobotThinking}
            >
              {symbol && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={symbol === "X" ? "text-accent font-sans" : "text-zellige font-sans"}
                >
                  {symbol}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="h-10 mb-4 flex items-center justify-center">
        {winner ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-zellige tracking-wide"
          >
            {fmt(g.wins, { name: winner === "X" ? g.player1 : isVsRobot ? g.robot : g.player2 })}
          </motion.div>
        ) : isDraw ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-muted tracking-wide"
          >
            {g.draw}
          </motion.div>
        ) : null}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetGame}
        className="px-8 py-3 bg-transparent border-2 border-zellige text-zellige font-bold rounded-lg hover:bg-zellige hover:text-bg transition duration-300 w-full tracking-wider uppercase text-sm"
      >
        {winner || isDraw ? g.again : g.reset}
      </motion.button>
    </div>
  );
}
