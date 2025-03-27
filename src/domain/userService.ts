import { userRepository } from "../repositories/user";
import { UserRequestType, UserDbType } from "../types/user";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export const userService = {
	
  async createPost(user: UserRequestType): Promise<UserDbType | null> {
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await this._generateHash(user.password, passwordSalt);

    console.log(passwordSalt);

    const newUser: UserDbType = {
      // _id: new ObjectId() as unknown,
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

  async checkCredentials(loginOrEmail: string, password: string) {
    const user = await userRepository.findByLoginOrEmail(loginOrEmail);

    if (!user) return false;
    const passwordHash = await this._generateHash(password, user.passwordSalt);

    if (user.passwordHash !== passwordHash) {
      return false;
    }

    return true;
  },
};
