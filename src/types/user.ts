import { ObjectId } from "mongodb";

export type UserRequestType = {
  login: string;
  email: string;
  password: string;
};

export type UserDbType = {
  _id: ObjectId;
  userName: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: Date;
};
