import React from "react";
import Loader from "./ui/Loader";

const PageLoader = () => {
  return (
    <div className="center-content full-screen fixed z-50 top-0 left-0 bg-white dark:bg-gray-900">
      <Loader />
    </div>
  );
};

export default PageLoader;
