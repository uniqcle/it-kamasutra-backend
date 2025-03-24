import { PostType } from "../fake_data/posts";
import { ViewModel } from "../models/PostViewModel";

export const getPostViewModel = (post: PostType | null): ViewModel | null => {
  if (post) {
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
    };
  } else {
    return null;
  }
};
