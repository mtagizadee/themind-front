import React from "react";
import { useParams } from "react-router-dom";
import Box from "../components/ui/Box";
import useLobby from "../hooks/useLobby";

type TLobbyPageParams = {
  id: string;
};

const LobbyPage = () => {
  const { id } = useParams<TLobbyPageParams>();
  const { lobby, isLoading, error } = useLobby(id as any);

  return (
    <div className="center-content">
      <Box className="box-700">
        <h1> Lobby Page: {id} </h1>
      </Box>
    </div>
  );
};

export default LobbyPage;
