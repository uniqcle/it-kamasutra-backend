import { UserDbType } from '../user';
import * as express from "express";

declare global {
	declare namespace Express {
		export interface Request {
      user?: UserDbType | null;
    }
	}
}