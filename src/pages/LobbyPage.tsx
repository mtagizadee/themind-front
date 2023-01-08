import React from "react";
import { useParams } from "react-router-dom";
import Box from "../components/ui/Box";

type TLobbyPageParams = {
  id: string;
};

const LobbyPage = () => {
  const { id } = useParams<TLobbyPageParams>();

  return (
    <div className="center-content">
      <Box className="box-700">
        <h1> Lobby Page: {id} </h1>
      </Box>
    </div>
  );
};

export default LobbyPage;
