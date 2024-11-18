import express, { Request, Response } from "express";

// Controllers
import { getCustomers } from "./../controllers/customerController";

const customerRoutes = express.Router();

customerRoutes.get("/getAll", getCustomers);

export default customerRoutes;
