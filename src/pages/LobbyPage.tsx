import React from "react";
import { useParams } from "react-router-dom";

type TLobbyPageParams = {
  id: string;
};

const LobbyPage = () => {
  const { id } = useParams<TLobbyPageParams>();

  return (
    <div>
      <h1> Lobby Page: {id} </h1>
    </div>
  );
};

export default LobbyPage;
