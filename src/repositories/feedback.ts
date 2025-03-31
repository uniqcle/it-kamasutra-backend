import { feedBackCollection } from "../db/mongodb";
import { FeedbackItem } from "../types/feedback";

export const feedbackRepository = {
	async create(feedback: FeedbackItem): Promise<FeedbackItem | null> {
		
		let result = await feedBackCollection.insertOne(feedback);
		
			if (result.insertedId) {
			  return feedback;
			} else {
			  return null;
			}
	},
	
	async getAll(): Promise<FeedbackItem[] | null> {
		return feedBackCollection.find({}).toArray();
	}
};
