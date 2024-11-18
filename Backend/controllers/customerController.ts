import express, { Request, Response } from "express";

const getCustomers = (req: Request, res: Response) => {
  return res.status(200).json({ message: "All good." });
};

export { getCustomers };
