import React from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import AddUserPage from "../pages/AddUserPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddUserPage />} />
        <Route path="/create-lobby" element={<div> Create lobby </div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
