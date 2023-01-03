import React, { FC } from "react";

interface IInputProps {
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  className?: string;
}

/**
 * Input UI component for displaying input fields
 * @param IInputProps
 * @returns JSX.Element
 */
const Input: FC<IInputProps> = ({ id, name, type = "text", placeholder, label, className }) => {
  return (
    <div className={className}>
      <label htmlFor={id || name}> {label} </label>
      <input type={type} placeholder={placeholder} id={id || name} name={name} />
    </div>
  );
};

export default Input;
