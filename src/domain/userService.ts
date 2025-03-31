import { userRepository } from "../repositories/user";
import { UserRequestType, UserDbType } from "../types/user";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export const userService = {
  async registerUser(user: UserRequestType): Promise<UserDbType | null> {
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await this._generateHash(user.password, passwordSalt);

    console.log(passwordSalt);

    const newUser: UserDbType = {
      _id: new ObjectId(),
      userName: user.login,
      email: user.email,
      passwordHash,
      passwordSalt,
      createdAt: new Date(),
    };

    const createdUser = userRepository.createUser(newUser);

    return createdUser;
  },

  async _generateHash(password: string, passwordSalt: string) {
    const hash = await bcrypt.hash(password, passwordSalt);

    console.log(hash);

    return hash;
  },

  // Проверка логина (или почты, если логин почта)
  async checkCredentials(loginOrEmail: string, password: string) {
    const user = await userRepository.findByLoginOrEmail(loginOrEmail);

    // Если пользователя нет - отдаем false
    if (!user) return false;

    // Если есть пользователь, генерируем hash
    const passwordHash = await this._generateHash(password, user.passwordSalt);

    if (user.passwordHash !== passwordHash) {
      return false;
    }

    return user;
  },

  async findUserById(userId: string) {
    console.log("ID пользователя: ", userId);

    return userRepository.findUserById(userId);
  },
};
