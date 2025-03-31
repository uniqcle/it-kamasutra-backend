import { ObjectId } from "mongodb";

export type FeedbackItem = {
	comment: string, 
	userId: ObjectId
}