import { PostType } from '../fake_data/posts';
import { ViewModel } from '../models/PostViewModel';

export const getPostViewModel = (post: PostType): ViewModel => {
	return {
    id: post.id,
    title: post.title,
    body: post.body,
    userId: post.userId,
  };
}