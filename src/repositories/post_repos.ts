import { PostType, posts } from "../fake_data/posts";

export const postRepository = {
  filterPost(title: string | null) {
    if (title) {
      const filteredPosts = posts.filter((p) => p.title.includes(title));
      return filteredPosts;
    } else {
      return posts;
    }
  },

  getProductById(id: number) {
    return posts.find((p) => p.id == id);
  },

  createPost(title: string, body: string) {
    const newProduct: PostType = {
      id: +new Date(),
      userId: 1,
      title: title,
      body: body,
      totalCount: 10,
    };

    return newProduct;
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
        return posts
      }
    }
    return false; 
  }
};
