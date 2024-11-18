import mongoose, { Document, Schema } from "mongoose";

export interface AttendanceRecord {
  subject: string;
  date: Date;
  attended: boolean;
}

export interface SubjectRecord {
  ID: string;
  name: string;
}

export interface Employee extends Document {
  ID: string;
  name: string;
  age: number;
  class: string;
  subjects: SubjectRecord[];
  attendance: AttendanceRecord[];
}

const EmployeeSchema: Schema = new Schema({
  ID: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: { type: String, required: true },
  subjects: { type: [Object], required: true },
  attendance: [
    {
      subject: { type: String },
      date: { type: Date },
      attended: { type: Boolean },
    },
  ],
});

export const EmployeeModel = mongoose.model<Employee>("Employees", EmployeeSchema);
