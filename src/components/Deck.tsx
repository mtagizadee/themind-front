import {
  calculateDownwardShift,
  calculateRotationAngle,
  calculateXShift,
  findMiddleIndex,
  isInLeft,
} from "../common/helpers";
import useGameFlow from "../hooks/useGameFlow";
import PlayingCard from "./cards/PlayingCard";

/**
 * Deck component that will render the deck of the current player and manage play card
 * @returns JSX.Element - deck of the current player
 */
const Deck = () => {
  const { game } = useGameFlow();
  const { cards } = game.client;
  const temp = ["1", "2", "3", ...cards];
  const middleIndex = findMiddleIndex(temp);

  return (
    <section className="flex">
      {temp.map((card, index) => {
        const rotationAngle = calculateRotationAngle(index, middleIndex);
        const downwardShift = calculateDownwardShift(index, middleIndex);
        const xShift = calculateXShift(index, middleIndex);

        const isMiddleCard = index === middleIndex;
        const isLeftCard = isInLeft(index, middleIndex);

        return (
          <div
            style={{
              transform: `rotate(${
                isMiddleCard ? 0 : isLeftCard ? -rotationAngle : rotationAngle
              }deg) translateY(${isMiddleCard ? 0 : downwardShift}px) translateX(${
                isMiddleCard ? 0 : isLeftCard ? xShift : -xShift
              }px)`,
            }}
          >
            <PlayingCard card={card} hidden={false} key={card} toPlay={true} />
          </div>
        );
      })}
    </section>
  );
};

export default Deck;
