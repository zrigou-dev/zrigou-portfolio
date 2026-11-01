"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const loading = () => <div className="h-96 w-full max-w-lg animate-pulse rounded-2xl bg-surface" />;

const GAMES = [
  { id: "memory", name: "Memory Match", Component: dynamic(() => import("./MemoryGame"), { loading }) },
  { id: "tictactoe", name: "Tic Tac Toe", Component: dynamic(() => import("./TicTacToe"), { loading }) },
  { id: "rps", name: "RPS Battle", Component: dynamic(() => import("./RockPaperScissors"), { loading }) },
  { id: "snake", name: "Snake", Component: dynamic(() => import("./SnakeGame"), { loading }) },
  { id: "reaction", name: "Reaction Test", Component: dynamic(() => import("./ReactionGame"), { loading }) },
];

export default function GameArcade() {
  const [activeId, setActiveId] = useState(GAMES[0].id);
  const { Component } = GAMES.find((game) => game.id === activeId);

  return (
    <>
      <div role="tablist" aria-label="Games" className="mb-10 mt-10 flex flex-wrap gap-2">
        {GAMES.map((game) => (
          <button
            key={game.id}
            type="button"
            role="tab"
            aria-selected={activeId === game.id}
            onClick={() => setActiveId(game.id)}
            className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${
              activeId === game.id ? "bg-accent-fill text-on-accent" : "border border-line text-ink-soft hover:border-line-strong hover:text-ink"
            }`}
          >
            {game.name}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="flex justify-center">
        <Component key={activeId} />
      </div>
    </>
  );
}
