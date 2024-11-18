import { Resolver, Query, Mutation, Arg, Int, Ctx, Authorized } from "type-graphql";
import { GraphQLError } from "graphql";

// Data arrays
import { SubjectModel } from "../models/subject";
import { PaginationInput, SubjectRecord } from "../types/common";
import { ERROR_DUPLICATE_SUBJECT_ID, ERROR_SUBJECT_NOT_FOUND_ID, ERROR_SUBJECT_NOT_PROVIDED_ID } from "../globals";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const subjectTypeDefs = `#graphql
  type SubjectRecord {
     ID: String
     name : String
    }
  type Query {
  subjects: [SubjectRecord]
}`;

@Resolver()
export class SubjectResolver {
  @Query(() => [SubjectRecord]) // Define return type as subject array
  async listSubjects(@Arg("filter", { nullable: true }) filter?: string, @Arg("pagination", { nullable: true }) pagination?: PaginationInput): Promise<SubjectRecord[]> {
    const query = filter ? { name: new RegExp(filter, "i") } : {};
    const limit = pagination?.limit || 10;
    const skip = ((pagination?.page || 1) - 1) * limit;
    return await SubjectModel.find(query).skip(skip).limit(limit).sort("name");
  }

  @Mutation(() => SubjectRecord)
  async addSubject(@Arg("ID", { nullable: false }) ID: string, @Arg("name", { nullable: false }) name: string): Promise<SubjectRecord> {
    // Check if a subject with the same ID already exists
    const existingSubject = await SubjectModel.findOne({ ID });
    if (existingSubject) {
      throw new GraphQLError("A subject with this ID already exists.", { extensions: { code: ERROR_DUPLICATE_SUBJECT_ID } });
    }

    const newSubject = new SubjectModel({ ID, name });
    await newSubject.save();
    return newSubject;
  }

  @Mutation(() => SubjectRecord)
  async updateSubjectName(@Arg("ID") ID: string, @Arg("name") name: string): Promise<SubjectRecord | null> {
    const subject = await SubjectModel.findOneAndUpdate(
      { ID },
      { name },
      { new: true } // This option returns the updated document
    );
    if (!subject) {
      throw new GraphQLError("A subject with this ID already exists.", { extensions: { code: ERROR_SUBJECT_NOT_FOUND_ID } });
    }

    if (name === "") {
      throw new GraphQLError("You must enter a subject name.", { extensions: { code: ERROR_SUBJECT_NOT_PROVIDED_ID } });
    }

    return subject;
  }
}

export { subjectTypeDefs };
