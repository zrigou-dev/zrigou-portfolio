"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaRobot,
  FaGhost,
  FaHeart,
  FaStar,
  FaMoon,
  FaSun,
  FaBolt,
} from "react-icons/fa";

const ICONS = [
  <FaRocket key="rocket" />,
  <FaRobot key="robot" />,
  <FaGhost key="ghost" />,
  <FaHeart key="heart" />,
  <FaStar key="star" />,
  <FaMoon key="moon" />,
  <FaSun key="sun" />,
  <FaBolt key="bolt" />,
];

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon }));
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsWon(false);
  };

  const handleCardClick = (index) => {
    // Prevent clicking if 2 cards are already flipped, or if card is already flipped/matched
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedPairs.includes(cards[index].icon.key)
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves((m) => m + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (cards[firstIndex].icon.key === cards[secondIndex].icon.key) {
        setMatchedPairs((prev) => [...prev, cards[firstIndex].icon.key]);
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0 && matchedPairs.length === ICONS.length) {
      setIsWon(true);
    }
  }, [matchedPairs, cards.length]);

  return (
    <div className="bg-surface p-6 rounded-2xl shadow-xl border border-line flex flex-col items-center">
      <h2 className="text-3xl font-bold text-ink mb-2">Memory Match</h2>
      <div className="flex justify-between w-full max-w-[300px] mb-6 text-muted font-medium">
        <span>Moves: {moves}</span>
        <span>Matches: {matchedPairs.length} / {ICONS.length}</span>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-8">
        {cards.map((card, index) => {
          const isFlipped =
            flippedIndices.includes(index) || matchedPairs.includes(card.icon.key);
          return (
            <motion.button
              key={card.id}
              type="button"
              aria-label={isFlipped ? `Card ${index + 1}, ${card.icon.key}` : `Card ${index + 1}, face down`}
              className="relative w-16 h-16 sm:w-20 sm:h-20 aspect-square cursor-pointer"
              onClick={() => handleCardClick(index)}
              whileHover={{ scale: isFlipped ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute w-full h-full rounded-xl flex items-center justify-center text-3xl shadow-md border-2"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Back of Card (Hidden) */}
                <div
                  className={`absolute w-full h-full flex items-center justify-center rounded-xl bg-bg border-line backface-hidden`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="w-1/2 h-1/2 rounded-full bg-surface-2"></div>
                </div>

                {/* Front of Card (Revealed) */}
                <div
                  className={`absolute w-full h-full flex items-center justify-center rounded-xl bg-accent-fill border-accent text-on-accent backface-hidden text-2xl sm:text-3xl`}
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  {card.icon}
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {isWon && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="text-2xl font-bold text-zellige mb-2">You Won! 🎉</div>
          <p className="text-sm text-muted">Completed in {moves} moves.</p>
        </motion.div>
      )}

      <button
        onClick={initializeGame}
        className="px-6 py-2 bg-accent-fill hover:opacity-90 text-on-accent font-semibold rounded-full transition"
      >
        {isWon ? "Play Again" : "Restart Game"}
      </button>
    </div>
  );
}
