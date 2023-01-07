import React from "react";
import useAuth from "../../hooks/useAuth";
import ThemeSwitch from "./ThemeSwitch";
import { FiLogOut } from "react-icons/fi";

const Menu = () => {
  const { auth } = useAuth();

  return (
    <div className="fixed left-3 top-3 center-col">
      <ThemeSwitch />
      {auth ? <LogOut /> : null}
    </div>
  );
};

const LogOut = () => {
  const { unauthorize } = useAuth();

  return (
    <button
      className="menu-item-box"
      onClick={() => {
        unauthorize();
        localStorage.clear();
      }}
    >
      <FiLogOut />
    </button>
  );
};

export default Menu;
