import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-blue-600 w-[80px] h-[30px] rounded-lg shadow-md hover:bg-blue-500 cursor-pointer flex items-center justify-center" onClick={goBack}>
      <p className="text-white font-bold">Back</p>
    </div>
  );
}

export default BackButton;
