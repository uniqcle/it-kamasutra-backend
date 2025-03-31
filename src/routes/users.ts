import { Request, Response, Router } from "express";
import { userService } from "../domain/userService";

export const getUsersRoutes = () => {
  const userRouter = Router();

  userRouter.post("/", async (req: Request, res: Response) => {
    // Регистрация пользователя
    const newUser = await userService.registerUser(req.body);

    res.status(200).send(newUser);
  });

  return userRouter;
};
