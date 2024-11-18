import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType() // This makes it a GraphQL type
export class SubjectRecord {
  @Field()
  ID: string;

  @Field()
  name: string;
}

@InputType() // This makes it a GraphQL type
export class SubjectRecordInput {
  @Field()
  ID: string;

  @Field()
  name: string;
}

@ObjectType() // This makes it a GraphQL type
export class AttendanceRecord {
  @Field()
  subject: string;

  @Field()
  date: Date;

  @Field()
  attended: boolean;
}

// Input type for updating attendance records
@InputType()
export class AttendanceRecordInput {
  @Field()
  subject: string;

  @Field()
  date: Date;

  @Field()
  attended: boolean;
}

@ObjectType()
export class Employee {
  @Field({ nullable: true })
  ID: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  class: string;

  @Field(() => Int, { nullable: true })
  age: number;

  @Field(() => [SubjectRecord], { nullable: true })
  subjects: SubjectRecord[];

  @Field(() => [AttendanceRecord], { nullable: true })
  attendance: AttendanceRecord[];
}

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  limit: number;
}
