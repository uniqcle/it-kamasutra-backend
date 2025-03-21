import { PostType, posts } from "../fake_data/posts";

export const postRepository = {
  async filterPost(title: string | null): Promise<PostType[]> {
    if (title) {
      const filteredPosts = posts.filter((p) => p.title.includes(title));
      return filteredPosts;
    } else {
      return posts;
    }
  },

  async getProductById(id: number): Promise<PostType | undefined> {
    const post = posts.find((p) => p.id == id);

    return post;
  },

  async createPost(title: string, body: string): Promise<PostType> {
    const newPost: PostType = {
      id: +new Date(),
      userId: 1,
      title: title,
      body: body,
      totalCount: 10,
    };

    posts.push(newPost);

    return newPost;
  },

  updatePost(id: number, title: string, body: string) {
    let post = posts.find((p) => p.id === id);

    if (post) {
      post.title = title;
      post.body = body;
      return post;
    } else {
      return false;
    }
  },

  deletePost(id: number) {
    //const deletedPost = posts.filter((p) => p.id !== id);
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
        posts.splice(i, 1);
        return posts;
      }
    }
    return false;
  },
};
