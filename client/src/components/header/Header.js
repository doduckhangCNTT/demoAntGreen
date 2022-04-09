import React from "react";
import Introduce from "./Introduce";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div>
      <div className="bg-green text-white ">
        <div className="container py-2 mx-auto ">
          <Introduce />
        </div>
      </div>
      <div className="">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
