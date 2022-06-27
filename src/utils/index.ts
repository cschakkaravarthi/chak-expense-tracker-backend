import bcrypt from "bcrypt";
import config from "../config";
import jwt from "jsonwebtoken";

//Utility functions
export const GenerateSalt = async (): Promise<string> => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (
  password: string,
  salt: string | number
): Promise<string> => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: any
): Promise<boolean> => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};

export const GenerateSignature = async (
  payload: any
): Promise<string | undefined> => {
  if (!config.APP_SECRET) {
    return undefined;
  }
  return await jwt.sign(payload, config.APP_SECRET, { expiresIn: "1d" });
};

export const ValidateSignature = async (req: any): Promise<boolean> => {
  if (!config.APP_SECRET) {
    return false;
  }
  const signature = req.get("Authorization");
  if (signature) {
    const payload = await jwt.verify(
      signature.split(" ")[1],
      config.APP_SECRET
    );
    req.user = payload;
    return true;
  }
  return false;
};

export const FormateData = (data: any) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};
