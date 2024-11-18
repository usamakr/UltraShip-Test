import express, { Request, Response } from "express";

// Controllers
import { correctTheEmployeeDates, addEmployees } from "./../controllers/playgroundController";

const playgroundRoutes = express.Router();

playgroundRoutes.get("/correctAttendanceDates", correctTheEmployeeDates);
playgroundRoutes.get("/addEmployees", addEmployees);

export default playgroundRoutes;
