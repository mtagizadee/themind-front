import React from "react";
import { Navigate, useParams } from "react-router";
import { privateRoutes, publicRoutes } from "../common/routes";
import useAuth from "../hooks/useAuth";
import AddUserPage from "./AddUserPage";

type TInvitationPageParams = {
  id: string;
};

const InvitationPage = () => {
  const { id } = useParams<TInvitationPageParams>();
  const { auth } = useAuth();

  return auth ? (
    <Navigate to={privateRoutes.lobbiesRoutes.lobby(id)} />
  ) : (
    <AddUserPage navigateTo={publicRoutes.invite(id)} />
  );
};

export default InvitationPage;
