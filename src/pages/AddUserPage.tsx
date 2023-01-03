import React from "react";
import Box from "../components/ui/Box";
import Input from "../components/ui/Input";

const AddUserPage = () => {
  return (
    <div className="center-content full-screen">
      <Box className="w-full max-w-[600px] ">
        <h1 className="text-center"> Welcome ! </h1>
        <form>
          <Input className="my-6" name="nickname" label="Enter your nickname" />
          <button type="submit"> Submit </button>
        </form>
      </Box>
    </div>
  );
};

export default AddUserPage;
