import React from "react";
import Categories from "./Categories";

const HamburgerMenu = () => {
  return (
    <div className="absolute z-100 top-[100%] w-full bg-white py-32 rounded-b-lg">
      <Categories className="mb-0" />
    </div>
  );
};

export default HamburgerMenu;
