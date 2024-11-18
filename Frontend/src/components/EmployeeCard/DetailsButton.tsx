import React from "react";

import { MdOutlineMoreHoriz } from "react-icons/md";

interface DetailsButtonProps {
  details: () => void;
}

function DetailsButton({ details }: DetailsButtonProps) {
  return (
    <div className="group flex justify-center items-center  hover:bg-slate-200 transition-colors duration-200 rounded-md col-start-9 col-span-2" onClick={details}>
      <MdOutlineMoreHoriz size={20} className={` text-slate-800`} />
    </div>
  );
}

export default DetailsButton;
