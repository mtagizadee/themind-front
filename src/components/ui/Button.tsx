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
    <button
      className="w-full py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {!disabled ? children : "Loading..."}
    </button>
  );
};

export default Button;
