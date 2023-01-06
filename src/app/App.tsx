import React from "react";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../common/routes";
import useAuth from "../hooks/useAuth";
import AddUserPage from "../pages/AddUserPage";
import CreateLobbyPage from "../pages/CreateLobbyPage";
import UserProvider from "../contexts/UserProvider";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={publicRoutes.addUserPage} element={<AddUserPage />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<UserLayout />}>
            <Route path={privateRoutes.createLobbyPage} element={<CreateLobbyPage />} />
            <Route path={`${privateRoutes.lobbies}/:id`} element={<div> Lobbies Page </div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

/**
 * PrivateRoutes is a route which checks if the user is authorized and redirects to the add user page if not
 * @returns JSX.Element which can be the outlet or a redirect to the page
 */
const PrivateRoutes = () => {
  const { auth } = useAuth();

  return auth ? <Outlet /> : <Navigate to="/" />; // TODO: decide to which page is should lead
};

/**
 * UserLayout is a layout which wraps the outlet in the UserProvider to provide the user data in the route
 * @returns JSX.Element which is the outlet wrapped in the UserProvider
 */
const UserLayout = () => {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
};

export default App;
