import { feedbackRepository } from "../repositories/feedback";
import { FeedbackItem } from "../types/feedback";

export const feedbackService = {
  async create(feedback: FeedbackItem): Promise<FeedbackItem | null> {
    return await feedbackRepository.create(feedback);
  },

	async getAll(): Promise<FeedbackItem[] | null> {
		return await feedbackRepository.getAll(); 
  },
};
