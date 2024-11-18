import React from "react";
import { IconType } from "react-icons";
import { trimText } from "../../helpers/Helpers";

const SHORT_TRIM_LENGTH = 15;
const MAX_TRIM_LENGTH = 150;

interface CardLineProps {
  showFull?: boolean;
  info: string;
  Icon: IconType;
}

function CardLine({ showFull = false, info, Icon }: CardLineProps) {
  return (
    <div className="grid grid-cols-4 items-center">
      <div className="text-left p-1 flex items-center">
        <Icon size={20} />
      </div>
      <div className="col-span-3 ">
        <p className="text-sm m-0 font-normal text-nowrap justify-end overflow-clip flex items-center ">{`${trimText(showFull ? MAX_TRIM_LENGTH : SHORT_TRIM_LENGTH, info)}`}</p>
      </div>
    </div>
  );
}

export default CardLine;
