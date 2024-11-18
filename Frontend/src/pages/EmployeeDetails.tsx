import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import EmployeeCardFull from "../components/EmployeeCardFull/EmployeeCardFull";

function EmployeeDetails() {
  const [searchParams] = useSearchParams();
  const userID = searchParams.get("userID") || "0";
  console.log(`User ID is ${userID}`);

  return (
    <div>
      <EmployeeCardFull id={parseInt(userID)} />
    </div>
  );
}

export default EmployeeDetails;
