import React from "react";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AddUserPage from "../pages/AddUserPage";
import CreateLobbyPage from "../pages/CreateLobbyPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddUserPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/create-lobby" element={<CreateLobbyPage />} />
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
