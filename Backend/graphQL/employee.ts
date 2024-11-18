import { Resolver, Query, Mutation, Arg, Int, Ctx, Authorized, UseMiddleware } from "type-graphql";

// Data arrays
import { employees } from "../data/employee";

// DB Models
import { EmployeeModel } from "../models/employee";
import { AttendanceRecord, AttendanceRecordInput, Employee, PaginationInput, SubjectRecord, SubjectRecordInput } from "../types/common";
import { ERROR_DUPLICATE_EMPLOYEE_ID, ERROR_EMPLOYEE_NOT_FOUND_ID } from "../globals";
import { GraphQLError } from "graphql";
import { AuthHeader, MyContext, USER_ROLE } from "../middleware/Authcontext";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const employeesTypeDefs = `#graphql
  type AttendanceRecord{
    subject: String
    date: String
    attended: Boolean
  }
  type Employees {
    ID: String
    name: String
    class : String
    age : Int
    subjects : [SubjectRecord]
    attendance : [AttendanceRecord]
  }

  type Query {
    employees: [Employees]
}`;

@Resolver()
export class EmployeeResolver {
  @Query(() => [Employee]) // Define return type as Employee array
  @UseMiddleware(AuthHeader)
  async listEmployees(
    @Ctx() context: MyContext,
    @Arg("filter", { nullable: true }) filter?: string,
    @Arg("pagination", { nullable: true }) pagination?: PaginationInput
  ): Promise<Employee[]> {
    const userRole = context.user.role;
    const isAdmin = userRole === USER_ROLE.admin;

    const query = filter ? { name: new RegExp(filter, "i") } : {};
    const limit = pagination?.limit || 10;
    const skip = ((pagination?.page || 1) - 1) * limit;

    if (isAdmin) {
      return await EmployeeModel.find(query).skip(skip).limit(limit).sort("name");
    } else {
      return await EmployeeModel.find(query).select("name age").skip(skip).limit(limit).sort("name");
    }
  }

  @Mutation(() => Employee)
  async addEmployee(
    @Arg("ID", { nullable: false }) ID: string,
    @Arg("name", { nullable: false }) name: string,
    @Arg("age", { nullable: false }) age: number,
    @Arg("class", { nullable: false }) cl: string
  ): Promise<Employee> {
    // Check if a subject with the same ID already exists
    const existingEmployee = await EmployeeModel.findOne({ ID, name, age, class: cl });
    if (existingEmployee) {
      throw new GraphQLError("An employee with this ID already exists.", { extensions: { code: ERROR_DUPLICATE_EMPLOYEE_ID } });
    }

    const newEmployee = new EmployeeModel({ ID, name });
    await newEmployee.save();
    return newEmployee;
  }

  @Mutation(() => Employee)
  async updateEmployeeAttendance(
    @Arg("employeeID") employeeID: string,
    @Arg("attendanceRecords", () => [AttendanceRecordInput]) attendanceRecords: AttendanceRecord[]
  ): Promise<Employee | null> {
    const employee = await EmployeeModel.findOneAndUpdate({ ID: employeeID }, { attendance: attendanceRecords }, { new: true });

    if (!employee) {
      throw new GraphQLError("Employee not found.", { extensions: { code: ERROR_EMPLOYEE_NOT_FOUND_ID } });
    }

    return employee;
  }

  @Mutation(() => Employee)
  async updateEmployeeSubjects(@Arg("employeeID") employeeID: string, @Arg("subjects", () => [SubjectRecordInput]) subjects: SubjectRecord[]): Promise<Employee | null> {
    const employee = await EmployeeModel.findOneAndUpdate({ ID: employeeID }, { subjects: subjects }, { new: true });

    if (!employee) {
      throw new GraphQLError("Employee not found.", { extensions: { code: ERROR_EMPLOYEE_NOT_FOUND_ID } });
    }

    return employee;
  }
}

export { employeesTypeDefs };
