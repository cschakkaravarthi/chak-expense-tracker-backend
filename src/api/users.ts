import UsersService from "../services/users-service";
import UserAuth from "./middleware/auth";
import { Application, Request, Response, NextFunction } from "express";
import { UsersModel } from "../database/models";

const users = (app: Application) => {
  const service = new UsersService();

  app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json("Hello Users");
    } catch (error) {
      next(error);
    }
  });

  // app.post("/customer/signup", async (req, res, next) => {
  //   try {
  //     const { email, password, phone } = req.body;
  //     const { data } = await service.SignUp({ email, password, phone });
  //     return res.json(data);
  //   } catch (err) {
  //     next(err);
  //   }
  // });

  // app.post("/customer/login", async (req, res, next) => {
  //   try {
  //     const { email, password } = req.body;

  //     const { data } = await service.SignIn({ email, password });

  //     return res.json(data);
  //   } catch (err) {
  //     next(err);
  //   }
  // });

  app.post(
    "/users_create",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const usersData: UsersModel = req.body;
        // validation
        const { data } = await service.CreateUsers(usersData);
        return res.json(data);
      } catch (err) {
        next(err);
      }
    }
  );

  app.post("/ids", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ids } = req.body;
      const products = await service.GetSelectedUsers(ids);
      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  });

  app.delete(
    "/get_user_by_id/:id",
    UserAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      const { _id } = req.body;
      const userId = req.params.id;

      try {
        const users = await service.GetUsersById(userId);
        return res.status(200).json(users);
      } catch (err) {
        next(err);
      }
    }
  );

  app.get(
    "/get_users",
    async (req: Request, res: Response, next: NextFunction) => {
      //check validation
      try {
        const { data } = await service.GetUsers();
        return res.status(200).json(data);
      } catch (error) {
        next(error);
      }
    }
  );
};

export default users;
