import React from "react";

import { FaChevronDown } from "react-icons/fa";

interface MoreButtonProps {
  isOpen: boolean;
  toggleView: () => void;
}

function MoreButton({ isOpen, toggleView }: MoreButtonProps) {
  return (
    <div className="group flex justify-center items-center bg-slate-200 rounded-md col-start-1 col-span-2" onClick={toggleView}>
      <FaChevronDown size={20} className={`${isOpen ? "rotate-180" : "rotate-0"} transition-transform duration-150 text-slate-800`} />
    </div>
  );
}

export default MoreButton;
