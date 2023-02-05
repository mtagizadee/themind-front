import React, { FC, ReactNode } from "react";
import { getNumbersTo } from "../../common/helpers";

interface IBarProps {
  currrentValue: number;
  maxValue: number;
  element: JSX.Element;
  emptyElement: JSX.Element;
  changable?: boolean;
  increase?: () => void;
  decrease?: () => void;
}

const Bar: FC<IBarProps> = ({
  currrentValue,
  maxValue,
  increase,
  decrease,
  element,
  emptyElement,
}) => {
  return (
    <div className="center-row gap-2">
      {getNumbersTo(maxValue).map((number) => {
        return <Element key={number}>{number < currrentValue ? element : emptyElement}</Element>;
      })}
    </div>
  );
};

interface IElementProps {
  children: ReactNode;
}

const Element: FC<IElementProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Bar;
