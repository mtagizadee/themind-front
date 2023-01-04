import React, { FC, ReactNode } from "react";

interface IButtonProps {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: () => void;
  /**
   * If true, the button will be disabled
   * and the text will be "Loading..."
   * @default false
   */
  disabled?: boolean;
}

/**
 * Button component UI component
 * @param IButtonProps
 * @returns JSX.Element
 */
const Button: FC<IButtonProps> = ({ type = "button", children, onClick, disabled = false }) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {!disabled ? children : "Loading..."}
    </button>
  );
};

export default Button;
