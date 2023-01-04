import React from "react";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../common/routes";
import useAuth from "../hooks/useAuth";
import AddUserPage from "../pages/AddUserPage";
import CreateLobbyPage from "../pages/CreateLobbyPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={publicRoutes.addUserPage} element={<AddUserPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path={privateRoutes.createLobbyPage} element={<CreateLobbyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const PrivateRoutes = () => {
  const { auth } = useAuth();

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default App;
