import dotenv from "dotenv";

// Config
dotenv.config();
export const SERVER_PORT = process.env.SERVER_PORT || 4001;
export const MONGODB_URL = process.env.MONGO_DB_URL || "";

// Error codes
export const ERROR_DUPLICATE_SUBJECT_ID = 123;
export const ERROR_SUBJECT_NOT_FOUND_ID = 124;
export const ERROR_SUBJECT_NOT_PROVIDED_ID = 125;

export const ERROR_DUPLICATE_EMPLOYEE_ID = 223;
export const ERROR_EMPLOYEE_NOT_FOUND_ID = 224;

export const ERROR_NOT_AUTHENTICATED = 1;
export const ERROR_NOT_AUTHORIZED = 2;
