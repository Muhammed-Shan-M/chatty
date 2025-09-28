import type { IUser } from "./usertype.types.ts";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser; 
  }
}