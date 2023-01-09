import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Box from "../components/ui/Box";
import useLobby from "../hooks/useLobby";
import PageLoader from "../components/PageLoader";
import { AxiosError } from "axios";
import { publicRoutes } from "../common/routes";
import useUser from "../hooks/useUser";

type TLobbyPageParams = {
  id: string;
};

const LobbyPage = () => {
  const { id } = useParams<TLobbyPageParams>();
  const { lobby, isLoading, error } = useLobby(id as any);
  const { id: clientId } = useUser();

  // Handle loading and error
  if (isLoading) return <PageLoader />;
  if (error instanceof AxiosError && error.response?.status === 404)
    return <Navigate to={publicRoutes.notFoundPage} />;

  return (
    <div className="center-content">
      <Box className="box-700">
        <h1>Lobby Page: {lobby.authorId}</h1>
      </Box>
    </div>
  );
};

export default LobbyPage;
