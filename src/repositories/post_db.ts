import { postCollection } from "../db/mongodb";
import { PostType } from "../fake_data/posts";

export const postRepository = {
  /* фильтрация */
  async filterPost(title: string | null): Promise<PostType[]> {
    const filter: any = {};

    if (title) {
      filter.title = { $regex: title };
    }

    return postCollection.find(filter).toArray();

    //   const filteredPosts = posts.filter((p) => p.title.includes(title));
    //   return filteredPosts;
  },

  async getProductById(id: number | string): Promise<PostType | null> {
    let post = await postCollection.findOne({ id: id });

    if (post) {
      return post;
    } else {
      return null;
    }

    // const post = posts.find((p) => p.id == id);
    // return post;
  },

  async createPost(title: string, body: string): Promise<PostType | null> {
    const newPost: PostType = {
      id: +new Date(),
      userId: 1,
      title: title,
      body: body,
      totalCount: 10,
    };

    let result = await postCollection.insertOne(newPost);

    if (result.insertedId) {
      return newPost;
    } else {
      return null;
    }

    // posts.push(newPost);
    // return newPost;
  },

  async updatePost(
    id: string | number,
    title: string,
    body: string
  ): Promise<boolean> {
    const result = await postCollection.updateOne(
      { id: id },
      { $set: { title: title, body: body } }
    );

    if (result.matchedCount) {
      return true;
    } else {
      return false;
    }

    //let post = posts.find((p) => p.id === id);
    // if (post) {
    //   post.title = title;
    //   post.body = body;
    //   return post;
    // } else {
    //   return null;
    // }
  },

  async deletePost(id: string | number): Promise<boolean> {
    const result = await postCollection.deleteOne({ id: id });

    return result.deletedCount === 1;

    //const deletedPost = posts.filter((p) => p.id !== id);
    // for (let i = 0; i < posts.length; i++) {
    //   if (posts[i].id === id) {
    //     posts.splice(i, 1);
    //     return posts;
    //   }
    // }
    // return null;
  },
};
