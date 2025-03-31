
import { Request, Response, Router } from 'express'; 
import { userService } from '../domain/userService';
import { jwtService } from "../application/jwtService";

export const authRouter = Router();

authRouter.post("/", async (req: Request, res: Response) => {
  // 1. Получаем данные из тела запроса. И проверяем эти данные в БД
  const user = await userService.checkCredentials(
    req.body.email,
    req.body.password
  );

  if (user) {
    // 2. Если пользователь есть в БД, генерируем временный токен и отдает на фронт
    const token = await jwtService.createJWT(user);
    res.status(201).send(token);
  } else {
    res.sendStatus(401);
  }
});