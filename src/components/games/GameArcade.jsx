"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useI18n } from "@/i18n/I18nProvider";

const loading = () => <div className="h-96 w-full max-w-lg animate-pulse rounded-2xl bg-surface" />;

const GAMES = [
  { id: "memory", Component: dynamic(() => import("./MemoryGame"), { loading }) },
  { id: "tictactoe", Component: dynamic(() => import("./TicTacToe"), { loading }) },
  { id: "rps", Component: dynamic(() => import("./RockPaperScissors"), { loading }) },
  { id: "snake", Component: dynamic(() => import("./SnakeGame"), { loading }) },
  { id: "reaction", Component: dynamic(() => import("./ReactionGame"), { loading }) },
];

export default function GameArcade() {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState(GAMES[0].id);
  const { Component } = GAMES.find((game) => game.id === activeId);

  return (
    <>
      <div role="tablist" aria-label={t.games.tablist} className="-mx-[clamp(1.25rem,4vw,3.5rem)] mb-8 mt-8 flex gap-2 overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)] pb-1 [scrollbar-width:none] md:mx-0 md:mb-10 md:mt-10 md:flex-wrap md:overflow-visible md:px-0">
        {GAMES.map((game) => (
          <button
            key={game.id}
            type="button"
            role="tab"
            aria-selected={activeId === game.id}
            onClick={() => setActiveId(game.id)}
            className={`min-h-11 shrink-0 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors md:px-5 ${
              activeId === game.id ? "bg-accent-fill text-on-accent" : "border border-line text-ink-soft hover:border-line-strong hover:text-ink"
            }`}
          >
            {t.games.names[game.id]}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="flex justify-center">
        <Component key={activeId} />
      </div>
    </>
  );
}
