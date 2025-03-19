import { body, query, validationResult } from "express-validator";

export const updatePostValidateMiddleware = () => body("title").trim()
      .isLength({ min: 3, max: 10 })
      .withMessage("Заголовк для обновления не соответствует")
