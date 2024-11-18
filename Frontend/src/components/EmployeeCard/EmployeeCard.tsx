// Libs
import React, { useState } from "react";
import classNames from "classnames";
import moment from "moment";
import { Navigate, useNavigate } from "react-router-dom";

// Helpers
import { EmployeeRecord } from "../../types/EmployeeRecord";

// Icons
import { FaBirthdayCake } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

// Components
import CardLine from "./CardLine";
import MoreButton from "./MoreButton";
import DetailsButton from "./DetailsButton";

type EmployeeCardProps = Partial<EmployeeRecord> & { index: number };

function EmployeeCard({ picture, name, dob, email, phone, location, id, index }: EmployeeCardProps) {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState<boolean>(false);

  let isMale = name?.title === "Mr";
  let birthday = moment(dob?.date).format("DD-MM-YYYY") || "---";

  return (
    <div className={classNames("min-w-[200px] h-min bg-slate-300  rounded-lg shadow-md p-2 cursor-pointer transition-colors duration-100")}>
      <div className="grid grid-cols-1 gap-1 p-8">
        <img src={picture?.medium} className="rounded-full w-full h-auto border-4 border-slate-100" />
      </div>
      <div className="grid grid-cols-2">
        <p className="text-lg font-medium text-nowrap">{`${name?.first || "---"} ${name?.last || "---"}`}</p>
        <p className="text-lg font-medium text-right">{dob?.age || "---"}</p>
      </div>
      <div className={`${expanded ? "h-[140px]" : "h-[0px]"} overflow-clip transition-all duration-300`}>
        <CardLine Icon={FaBirthdayCake} info={birthday} />
        <CardLine Icon={MdOutlineMail} info={email || "---"} />
        <CardLine Icon={FaPhone} info={phone || "---"} />
        <CardLine Icon={FaCity} info={location?.city || "---"} />
        <CardLine Icon={TbWorld} info={location?.country || "---"} />
      </div>

      <div className="grid grid-cols-10 pt-2">
        <MoreButton isOpen={expanded} toggleView={() => setExpanded((prev) => !prev)} />
        <DetailsButton
          details={() => {
            navigate(`/details?userID=${index}`);
          }}
        />
      </div>
    </div>
  );
}

export default EmployeeCard;
