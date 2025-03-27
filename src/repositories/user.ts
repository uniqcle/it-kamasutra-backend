import { userCollection } from "../db/mongodb";
import { UserDbType } from '../types/user';

export const userRepository = {

	async createUser(user: UserDbType): Promise<UserDbType | null> {
		let result = await userCollection.insertOne(user); 

		if (result.insertedId) {
			return user
		} else {
			return null
		}
	},


	async findByLoginOrEmail(loginOrEmail: string) {
		return await userCollection.findOne({$or: [{email: loginOrEmail}, {userName: loginOrEmail}]})
	}
}