import { TCard } from "../types";

const ROTATION_RATE = 6;
export const calculateRotationAngle = (index: number, middleIndex: number) => {
  return getDistanceFromMiddle(index, middleIndex) * ROTATION_RATE;
};

const DOWN_SHIFT_RATE = 20;
export const calculateDownwardShift = (index: number, middleIndex: number) => {
  return getDistanceFromMiddle(index, middleIndex) * DOWN_SHIFT_RATE;
};

const X_SHIFT_RATE = 50;
export const calculateXShift = (index: number, middleIndex: number) => {
  return getDistanceFromMiddle(index, middleIndex) * X_SHIFT_RATE;
};

export const findMiddleIndex = (cards: TCard[]) => {
  return Math.floor(cards.length / 2);
};

export const isInLeft = (cardIndex: number, middleIndex: number) => {
  return cardIndex < middleIndex;
};

export const isInRight = (cardIndex: number, middleIndex: number) => {
  return cardIndex > middleIndex;
};

export const getDistanceFromMiddle = (index: number, middleIndex: number) => {
  return Math.abs(index - middleIndex);
};
