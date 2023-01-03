import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUserPage from "../pages/AddUserPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddUserPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
