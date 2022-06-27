import mongoose, { ConnectOptions } from "mongoose";
import { stringify } from "querystring";
import config from "../config";

const databaseConnection = async () => {
  try {
    if (config.MONGO_URI) {
      await mongoose.connect(config.MONGO_URI);
      console.log("Db Connected");
    }
  } catch (error) {
    console.log("Error ============");
    console.log(error);
    process.exit(1);
  }
};

export const mongooseSchema = mongoose.Schema;
export const mongooseModel = (modelName: string, modelSchema: any) =>
  mongoose.model(modelName, modelSchema);

export default databaseConnection;
