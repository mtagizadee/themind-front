import React, { FC, useState } from "react";
import useAuth from "../../hooks/useAuth";
import ThemeSwitch from "./ThemeSwitch";
import { FiLogOut } from "react-icons/fi";
import Box from "../ui/Box";
import WarningModal from "../ui/WarningModal";

/**
 * Menu component which will be used in BasicLayout
 * @returns JSX.Element - menu component
 */
const Menu = () => {
  const { auth, unauthorize } = useAuth();
  const [warningModal, setWarningModal] = useState(false);

  return (
    <>
      <Box className="fixed left-3 top-3 center-col p-0">
        <ThemeSwitch />
        {auth ? <LogOut openModal={() => setWarningModal(true)} /> : null}
      </Box>
      <WarningModal
        onConfirm={() => {
          unauthorize();
          localStorage.clear();
        }}
        visible={warningModal}
        onClose={() => setWarningModal(false)}
      >
        Are you sure you want to log out?
      </WarningModal>
    </>
  );
};

interface ILogOutProps {
  openModal: () => void;
}

const LogOut: FC<ILogOutProps> = ({ openModal }) => {
  return (
    <button className="menu-item-box" onClick={openModal}>
      <FiLogOut />
    </button>
  );
};

export default Menu;
