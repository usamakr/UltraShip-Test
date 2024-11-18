import React, { useState } from "react";

// Icons
import { FaHome } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { RiContactsBookUploadLine } from "react-icons/ri";
import { IoMdHelp } from "react-icons/io";
import Button from "../Button/Button";

function Menu() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className="flex rounded-md   ">
      <Button title="Home" icon={FaHome} />
      <Button title="Orders" icon={FaMoneyBill} />
      <Button title="Contact" icon={RiContactsBookUploadLine} expandBelow={true}>
        <div className="w-[150px] h-min">
          <Button title="Head office" />
          <Button title="Field office " />
        </div>
      </Button>
      <Button title="Help" icon={IoMdHelp} expandBelow={true}>
        <div className="w-[150px] h-min">
          <Button title="FAQs">
            <Button title="National"></Button>
            <Button title="International" />
          </Button>
          <Button title="Support" />
          <Button title="Option 3" />
        </div>
      </Button>
    </div>
  );
}

export default Menu;
