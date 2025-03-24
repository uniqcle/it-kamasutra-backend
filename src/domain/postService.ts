import { postRepository } from "../repositories/post_db";

import { PostType } from "../fake_data/posts";

export const postService = {
  /* фильтрация */
  async filterPost(title: string | null): Promise<PostType[]> {
    return postRepository.filterPost(title);
  },

  async getProductById(id: number | string): Promise<PostType | null> {
    return postRepository.getProductById(id);
  },

  async createPost(title: string, body: string): Promise<PostType | null> {
    const newPost: PostType = {
      id: +new Date(),
      userId: 1,
      title: title,
      body: body,
      totalCount: 10,
    };

    let addedPost = await postRepository.createPost(newPost);

    return addedPost;

    // posts.push(newPost);
    // return newPost;
  },

  async updatePost(
    id: string | number,
    title: string,
    body: string
  ): Promise<boolean> {
    return await postRepository.updatePost(id, title, body);
  },

  async deletePost(id: string | number): Promise<boolean> {
    return await postRepository.deletePost(id);
  },
};
