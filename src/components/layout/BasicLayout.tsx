import React, { FC, ReactNode } from "react";
import Menu from "./Menu";

interface IBasicLayoutProps {
  children: ReactNode;
}

const BasicLayout: FC<IBasicLayoutProps> = ({ children }) => {
  return (
    <>
      <Menu />
      {children}
    </>
  );
};

export default BasicLayout;
