import { Request, Response, NextFunction } from 'express';
import { body, query, validationResult } from "express-validator";

export const inputValidationMiddlware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resultValidation = validationResult(req);

  if (!resultValidation.isEmpty()) {
    res.status(400).send({ errors: resultValidation.array() });
    return;
  } else {
    next();
  }
};