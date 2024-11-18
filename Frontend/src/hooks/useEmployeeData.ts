import axios from "axios";
import { useEffect, useState } from "react";
import { Delay } from "../helpers/Helpers";
import { EmployeeRecord } from "../types/EmployeeRecord";

const dummyURL = "https://randomuser.me/api/?results=5";

type Result = {
  results: EmployeeRecord[];
};

function useEmployeeData() {
  const [employeeData, setEmployeeData] = useState<EmployeeRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    await Delay(2000);
    try {
      const result = await axios.get<Result>(dummyURL);
      const resultTrimmed = result.data.results.map((employeeRecord) => ({
        id: employeeRecord.id,
        gender: employeeRecord.gender,
        name: {
          title: employeeRecord.name.title,
          first: employeeRecord.name.first,
          last: employeeRecord.name.last,
        },
        dob: {
          age: employeeRecord.dob.age,
          date: employeeRecord.dob.date,
        },
        location: {
          city: employeeRecord.location.city,
          country: employeeRecord.location.country,
        },
        email: employeeRecord.email,
        phone: employeeRecord.phone,
        picture: {
          medium: employeeRecord.picture.medium,
          large: employeeRecord.picture.large,
        },
      }));
      setEmployeeData(resultTrimmed || []);
      setLoading(false);
    } catch (error: any) {
      setEmployeeData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { employeeData, loading };
}

export default useEmployeeData;
