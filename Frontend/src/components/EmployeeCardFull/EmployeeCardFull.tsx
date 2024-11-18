import React from "react";
import moment from "moment";

// Redux
import { useAppSelector } from "../../store/hooks";

// Components
import EmployeeStatus from "../EmployeeStatus/EmployeeStatus";
import CardLine from "../EmployeeCard/CardLine";

// Icons
import { FaBirthdayCake } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import BackButton from "../BackButton/BackButton";

interface EmployeeCardFullProps {
  id: number;
}

function EmployeeCardFull({ id }: EmployeeCardFullProps) {
  const { data } = useAppSelector((state) => state.employeeData);

  const employeeInfo = data[id];
  const onlineStatus = Math.random() > 0.5;
  let birthday = moment(employeeInfo.dob?.date).format("DD-MM-YYYY") || "---";

  return (
    <div className="h-min w-2/5 bg-slate-200 grid grid-cols-1 gap-2 rounded-lg items-center shadow-md p-3">
      <div className="border-b-2 border-slate-300 p-2">
        <BackButton />
      </div>
      <div>
        <p className="font-bold text-xl">Employee Details</p>
      </div>
      <div className="flex items-center justify-start gap-5 ">
        <div className="  flex flex-col items-center justify-center">
          <div className="h-[200px] min-w-[120px] w-auto flex flex-col items-center justify-center gap-2">
            <img src={employeeInfo.picture.large} className="rounded-full" />
            <EmployeeStatus online={onlineStatus} />
          </div>
        </div>
        {/* <div className=" w-[2px] h-4/5 rounded-md bg-slate-400"></div> */}
        <div className=" grid grid-cols-1 h-4/5  gap-2 ">
          <div>
            <p className="font-bold text-lg">Personal</p>
            <CardLine Icon={FaBirthdayCake} info={birthday} showFull={true} />
          </div>
          <div>
            <p className="font-bold text-lg">Contact</p>
            <CardLine Icon={MdOutlineMail} info={employeeInfo.email || "---"} showFull={true} />
            <CardLine Icon={FaPhone} info={employeeInfo.phone || "---"} showFull={true} />
          </div>
          <div>
            <p className="font-bold text-lg">Address</p>
            <CardLine Icon={FaCity} info={employeeInfo.location?.city || "---"} showFull={true} />
            <CardLine Icon={TbWorld} info={employeeInfo.location?.country || "---"} showFull={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCardFull;
