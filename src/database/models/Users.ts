import { mongooseSchema, mongooseModel } from "./../index";

export interface UsersModel {
  user_id: string;
  user_name: string;
  password: string;
  first_name: string;
  last_name: string;
  dob: number; // Unix Timestamp
  mobile_no?: number;
  email?: string;
  updated_on: number; // Unix Timestamp
  created_on: number; // Unix Timestamp
}

const UsersSchema = new mongooseSchema({
  user_id: String,
  user_name: String,
  password: String,
  first_name: String,
  last_name: String,
  dob: Number, // Unix Timestamp
  mobile_no: Number,
  email: String,
  updated_on: Number, // Unix Timestamp
  created_on: Number, // Unix Timestamp
});

const UsersSchemaModel = mongooseModel("users", UsersSchema);

export default UsersSchemaModel;
