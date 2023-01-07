import { useState } from "react";

const useToggle = (toggleOnSuccess?: () => void, toggleOffSuccess?: () => void) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const onToggleOn = () => {
    setToggle(true);

    if (toggleOnSuccess) {
      toggleOnSuccess();
    }
  };

  const onToggleOff = () => {
    setToggle(false);

    if (toggleOffSuccess) {
      toggleOffSuccess();
    }
  };

  return [toggle, onToggleOn, onToggleOff] as [boolean, () => void, () => void];
};

export default useToggle;
