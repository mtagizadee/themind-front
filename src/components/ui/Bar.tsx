import React, { FC, ReactNode } from "react";

interface IBarProps {
  currrentValue: number;
  maxValue: number;
  element: JSX.Element;
  changable?: boolean;
  increase?: () => void;
  decrease?: () => void;
}

const Bar: FC<IBarProps> = ({ currrentValue, maxValue, increase, decrease, element }) => {
  return <div>{element}</div>;
};

export default Bar;
