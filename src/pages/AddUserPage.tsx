import React from "react";
import Box from "../components/ui/Box";

const AddUserPage = () => {
  return (
    <div className="center-content full-screen">
      <Box>
        <h1> Welcome ! </h1>
        <form>
          <label htmlFor="nickname"> Enter your nickname </label>
          <input type="text" name="nickname" id="nickname" />
          <button type="submit"> Submit </button>
        </form>
      </Box>
    </div>
  );
};

export default AddUserPage;
