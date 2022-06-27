import { UsersRepository } from "../database";
import { UsersModel } from "../database/models";
import {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} from "../utils";
const { APIError } = require("../utils/app-errors");

// All Business logic will be here
class UsersService {
  repository;

  constructor() {
    this.repository = new UsersRepository();
  }

  //   async SignIn(userInputs: UsersModel) {
  //     const { email, password } = userInputs;

  //     try {
  //       if (email) {
  //         const existingCustomer: UsersModel = await this.repository.FindUsers(
  //           email
  //         );
  //         if (existingCustomer) {
  //           const validPassword = await ValidatePassword(
  //             password,
  //             existingCustomer.password
  //           );

  //           if (validPassword) {
  //             const token = await GenerateSignature({
  //               email: existingCustomer.email,
  //               user_id: existingCustomer.user_id,
  //             });
  //             return FormateData({ user_id: existingCustomer.user_id, token });
  //           }
  //         }
  //       }

  //       return FormateData(null);
  //     } catch (err) {
  //       throw new APIError("Data Not found", err);
  //     }
  //   }

  //   async SignUp(userInputs) {
  //     const { email, password, phone } = userInputs;

  //     try {
  //       // create salt
  //       let salt = await GenerateSalt();

  //       let userPassword = await GeneratePassword(password, salt);

  //       const existingCustomer = await this.repository.CreateCustomer({
  //         email,
  //         password: userPassword,
  //         phone,
  //         salt,
  //       });

  //       const token = await GenerateSignature({
  //         email: email,
  //         _id: existingCustomer._id,
  //       });

  //       return FormateData({ id: existingCustomer._id, token });
  //     } catch (err) {
  //       throw new APIError("Data Not found", err);
  //     }
  //   }

  async CreateUsers(UsersInputs: UsersModel) {
    try {
      const usersResult = await this.repository.CreateUsers(UsersInputs);
      return FormateData(usersResult);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetUsers() {
    try {
      const users = await this.repository.Users();
      return FormateData(users);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetSelectedUsers(selectedIds: UsersModel[]) {
    try {
      const users = await this.repository.FindSelectedUsers(selectedIds);
      return FormateData(users);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetUsersById(userId: string) {
    try {
      return await this.repository.FindUsersById(userId);
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }
}

export default UsersService;
