import { useMemo, useState } from "react";
import {
  calculateDownwardShift,
  calculateRotationAngle,
  calculateXShift,
  findMiddleIndex,
  isInLeft,
} from "../common/helpers";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import useGameFlow from "../hooks/useGameFlow";
import PlayingCard from "./cards/PlayingCard";

// number of cards for each chunk of cards
const CHUNK_SIZE = 4;

/**
 * Deck component that will render the deck of the current player and manage play card
 * @returns JSX.Element - deck of the current player
 */
const Deck = () => {
  const { game } = useGameFlow();
  const { cards } = game.client;
  const [currentChunk, setCurrentChunk] = useState<number>(0);

  const incrementChunk = () => {
    if (currentChunk < chunks.length - 1) {
      setCurrentChunk(currentChunk + 1);
    }
  };

  const decrementChunk = () => {
    if (currentChunk > 0) {
      setCurrentChunk(currentChunk - 1);
    }
  };

  // split the cards into chunks to display them in the deck in a better way
  const chunks = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < cards?.length; i += CHUNK_SIZE) {
      chunks.push(cards.slice(i, i + CHUNK_SIZE));
    }

    return chunks;
  }, [cards]);
  const chunk = chunks[currentChunk];
  const middleIndex = findMiddleIndex(chunk);

  return (
    <section className="fixed -bottom-4 box-700">
      <div className="w-full center-content">
        {chunk?.length
          ? chunk.map((card, index) => {
              const rotationAngle = calculateRotationAngle(index, middleIndex);
              const downwardShift = calculateDownwardShift(index, middleIndex);
              const xShift = calculateXShift(index, middleIndex);

              const isMiddleCard = index === middleIndex;
              const isLeftCard = isInLeft(index, middleIndex);

              return (
                <div
                  key={card}
                  style={{
                    transform: `rotate(${
                      isMiddleCard ? 0 : isLeftCard ? -rotationAngle : rotationAngle
                    }deg) translateY(${isMiddleCard ? 0 : downwardShift}px) translateX(${
                      isMiddleCard ? 0 : isLeftCard ? xShift : -xShift
                    }px)`,
                  }}
                  className="pop-up"
                >
                  <PlayingCard card={card} hidden={false} toPlay={true} />
                </div>
              );
            })
          : null}
      </div>
      {game.currentLevel >= CHUNK_SIZE ? (
        <div className="center-col absolute right-0 top-12 gap-3 text-2xl pr-6">
          <button onClick={decrementChunk}>
            <FiArrowUp />
          </button>
          <button>
            <FiArrowDown onClick={incrementChunk} />
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default Deck;
