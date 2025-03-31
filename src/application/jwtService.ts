import { UserDbType } from "../types/user";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";


export const jwtService = {
  async createJWT(user: UserDbType) {
    
	// Создаем jwt-токен	
		const token = jwt.sign({ userId: user._id }, "any_private_key", {
      expiresIn: "12h",
    });

    return {
      resultCode: 0,
      data: {
        token: token,
      },
    };
  },

  // Вычлиняем userId из токена с помощью секретного ключа
  async getUserIdByToken(token: string) {
    try {
      const result: any = jwt.verify(token, "any_private_key");
      return result.userId;
    } catch (err) {
      return null;
    }
  },
};
