import UsersSchemaModel, { UsersModel } from "../models/Users";
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");

//Dealing with data base operations
class UsersRepository {
  async CreateUsers(usersData: UsersModel) {
    try {
      const users = new UsersSchemaModel(usersData);

      const productResult = await users.save();
      return productResult;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Users"
      );
    }
  }

  async Users() {
    try {
      return await UsersSchemaModel.find();
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Users"
      );
    }
  }

  async FindUsers(email: string) {
    try {
      const existingUsers = await UsersSchemaModel.findOne({ email: email });
      return existingUsers;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Users"
      );
    }
  }

  async FindUsersById(id: string) {
    try {
      return await UsersSchemaModel.findById(id);
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Users"
      );
    }
  }

  //   async FindByCategory(category) {
  //     try {
  //       const Users = await UsersSchemaModel.find({ type: category });
  //       return Users;
  //     } catch (err) {
  //       throw APIError(
  //         "API Error",
  //         STATUS_CODES.INTERNAL_ERROR,
  //         "Unable to Find Category"
  //       );
  //     }
  //   }

  async FindSelectedUsers(selectedIds: UsersModel[]) {
    try {
      const Users = await UsersSchemaModel.find()
        .where("_id")
        .in(selectedIds.map((_id) => _id))
        .exec();
      return Users;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Users"
      );
    }
  }
}

export default UsersRepository;
