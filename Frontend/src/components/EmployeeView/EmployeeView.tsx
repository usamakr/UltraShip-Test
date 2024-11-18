import React, { useEffect } from "react";

// Hooks
import useEmployeeData from "../../hooks/useEmployeeData";

// Libs
import { Blocks } from "react-loader-spinner";

// Components
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

// Slice
import { fetchEmployeeData } from "../../slices/employeeDataSlice";

function EmployeeView() {
  //   const { employeeData: data, loading } = useEmployeeData();
  const dispatch = useAppDispatch();
  const { loading, data } = useAppSelector((state) => state.employeeData);

  useEffect(() => {
    dispatch(fetchEmployeeData());
  }, []);

  return (
    <div className="w-full min-h-28 flex justify-center items-center">
      {loading ? <Blocks height="80" width="80" color="#4fa94d" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" visible={true} /> : null}
      {!loading && data.length > 0 ? (
        <div className=" w-full h-full grid grid-cols-5  gap-1">
          {data.map((employee, index) => (
            <EmployeeCard
              key={index}
              index={index}
              id={employee.id}
              picture={employee.picture}
              name={employee.name}
              dob={employee.dob}
              email={employee.email}
              phone={employee.phone}
              location={employee.location}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default EmployeeView;
