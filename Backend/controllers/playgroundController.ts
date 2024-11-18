import express, { Request, Response } from "express";
import moment from "moment";
import { EmployeeModel } from "../models/employee";
import { employees } from "../data/employee";

const correctTheEmployeeDates = async (req: Request, res: Response) => {
  try {
    // Fetch all employees from the database
    const allEmployees = await EmployeeModel.find();

    // Update each employee's attendance records
    for (const employee of allEmployees) {
      // Process each attendance record for the employee
      employee.attendance = employee.attendance.map((attendanceRecord) => {
        const formattedDate = moment(attendanceRecord.date, "YYYY-MM-DD");
        console.log(formattedDate.toDate());
        attendanceRecord.date = formattedDate.toDate(); // Convert to Date object
        return attendanceRecord;
      });

      // Save the updated employee document
      await employee.save();
    }

    return res.status(200).json({ message: "Changed the dates." });
  } catch (error: any) {
    return res.status(500).json({ message: "An error occurred.", error: error.message });
  }
};

const addEmployees = async (req: Request, res: Response) => {
  try {
    let result = await EmployeeModel.insertMany(employees);
    return res.status(200).json({ message: "Added te employees to the DB." });
  } catch (error: any) {
    return res.status(500).json({ message: "An error occurred.", error: error.message });
  }
};

export { correctTheEmployeeDates, addEmployees };
