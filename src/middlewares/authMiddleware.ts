import { NextFunction, Request, Response } from "express";
import { jwtService } from "../application/jwtService";
import { userService } from "../domain/userService";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!req.headers.authorization) {
    res.send(401);
    return;
  }
  // 1. Получили токен из authorization в headers
  const token = req.headers.authorization.split(" ")[1]; /// "bearer asdfsadfsadfsadf"

  // 2. Вычленили userId из токена.
  const userId = await jwtService.getUserIdByToken(token);

  if (userId) {
    //3. Ищем пользователя по ID
    let user = await userService.findUserById(userId);

    //4. Добавляем в запрос Request пользователя.
    req.user = user; 

     //5. Передаем дальше управление
    next();
  } else {
    // Если нет пользователя - то выдаем ошибку отказано в авторизации
    res.sendStatus(401);
  }

 
};
