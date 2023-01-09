import React from "react";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../common/routes";
import useAuth from "../hooks/useAuth";
import AddUserPage from "../pages/AddUserPage";
import CreateLobbyPage from "../pages/CreateLobbyPage";
import UserProvider from "../contexts/UserProvider";
import BasicLayout from "../components/layout/BasicLayout";
import LobbyPage from "../pages/LobbyPage";
import NotFoundPage from "../pages/NotFoundPage";

const App = () => {
  return (
    <BrowserRouter>
      <BasicLayout>
        <Routes>
          <Route path={publicRoutes.addUserPage} element={<AddUserPage />} />
          <Route path="*" element={<Navigate to={publicRoutes.notFoundPage} />} />
          <Route path={publicRoutes.notFoundPage} element={<NotFoundPage />} />

          <Route element={<PrivateRoutes />}>
            <Route element={<UserLayout />}>
              <Route path={privateRoutes.lobbiesRoutes.index}>
                <Route
                  index
                  path={privateRoutes.lobbiesRoutes.create}
                  element={<CreateLobbyPage />}
                />
                <Route path={privateRoutes.lobbiesRoutes.lobby()} element={<LobbyPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BasicLayout>
    </BrowserRouter>
  );
};

/**
 * PrivateRoutes is a route which checks if the user is authorized and redirects to the add user page if not
 * @returns JSX.Element which can be the outlet or a redirect to the page
 */
const PrivateRoutes = () => {
  const { auth } = useAuth();

  return auth ? <Outlet /> : <Navigate to={publicRoutes.addUserPage} />;
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
