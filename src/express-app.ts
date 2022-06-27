import express from "express";
// const cors  = require('cors');
import { users } from "./api";
import { Application } from "express";
// const HandleErrors = require("./utils/error-handler");

const expressApp = async (app: Application) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  // app.use(cors());
  app.use(express.static(__dirname + "/public"));

  //api
  users(app);

  // error handling
//   app.use(HandleErrors);
};

export default expressApp;
