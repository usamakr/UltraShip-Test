import mongoose, { Document, Schema } from "mongoose";

export interface SubjectRecord {
  ID: string;
  name: string;
}

export interface Subject extends Document {
  ID: string;
  name: string;
}

const SubjectSchema: Schema = new Schema({
  ID: { type: String, required: true },
  name: { type: String, required: true },
});

export const SubjectModel = mongoose.model<Subject>("Subjects", SubjectSchema);
