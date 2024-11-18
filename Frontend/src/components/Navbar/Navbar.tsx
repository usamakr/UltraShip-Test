import React from "react";

// Components
import Menu from "../Menu/Menu/Menu";
import BurgerNav from "../BurgerNav/BurgerNav";

function Navbar() {
  return (
    <div className="h-min w-full bg-transparent flex justify-between">
      <Menu />
      <BurgerNav />
    </div>
  );
}

export default Navbar;
