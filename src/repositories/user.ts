import { userCollection } from "../db/mongodb";
import { UserDbType } from '../types/user';
import { ObjectId } from "mongodb";

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
	},


	async findUserById(id: string) {
		return await userCollection.findOne({_id: new ObjectId(id)})
	}
}