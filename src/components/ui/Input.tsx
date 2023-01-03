import React, { FC } from "react";
import { FiAlertTriangle } from "react-icons/fi";

interface IInputProps {
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  error?: boolean;
  errorMessage?: string;
}

/**
 * Input UI component for displaying input fields
 * @param IInputProps
 * @returns JSX.Element
 */
const Input: FC<IInputProps> = ({
  id,
  name,
  type = "text",
  placeholder,
  label,
  className,
  error = false,
  errorMessage,
}) => {
  return (
    <div className={className}>
      <label className={error ? "text-red-700 dark:text-red-500" : ""} htmlFor={id || name}>
        {label}
      </label>
      <input
        className={
          error
            ? "border-red-500 text-red-900 placeholder-red-700  dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            : ""
        }
        type={type}
        placeholder={placeholder}
        id={id || name}
        name={name}
      />
      {error ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500 center-row gap-1">
          <FiAlertTriangle />
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};

export default Input;
