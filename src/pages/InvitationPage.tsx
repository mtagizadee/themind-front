import React from "react";
import { Navigate, useParams } from "react-router";
import { privateRoutes } from "../common/routes";

type TInvitationPageParams = {
  id: string;
};

const InvitationPage = () => {
  const { id } = useParams<TInvitationPageParams>();

  return <Navigate to={privateRoutes.lobbiesRoutes.lobby(id)} />;
};

export default InvitationPage;
