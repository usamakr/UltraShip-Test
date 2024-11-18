import React, { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";

// Components
import SideBar from "../SideBar/SideBar";

function BurgerNav() {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleMenu = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="cursor-pointer flex items-center justify-center relative">
      <GiHamburgerMenu size={30} className="text-black hover:scale-110 transition-transform duration-300" onClick={toggleMenu} />
      <SideBar open={expanded} />
    </div>
  );
}

export default BurgerNav;
