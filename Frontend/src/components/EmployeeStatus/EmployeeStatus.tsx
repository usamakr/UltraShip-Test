import classNames from "classnames";
import React from "react";

interface EmployeeStatusProps {
  online: boolean;
}

function EmployeeStatus({ online }: EmployeeStatusProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      <p>{online ? "Online" : "Offline"}</p>
      <div className={classNames("w-5 h-5 rounded-full", online ? "bg-green-600" : "bg-red-600")}></div>
    </div>
  );
}

export default EmployeeStatus;
