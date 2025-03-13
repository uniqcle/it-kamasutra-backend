import request from "supertest";
import { app } from "../../src";
import { posts, PostType } from "../../src/fake_data/posts";
import { ViewModel } from "../../src/models/PostViewModel";

describe("/posts", () => {
  // it('should return 200 and empty array', () => {
  // 	expect(1).toBe(1)
  // })

  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  it("sould return 200 and array", async () => {
    await request(app).get("/posts").expect(200, posts);
  });

  it("sould create post with correct input data", async () => {
    const data: PostType = {
      id: +new Date(),
      userId: 1,
      title: "Новый пост",
      body: "Тело нового поста",
      totalCount: 10,
    };

    const createdResponse = await request(app).post("/posts").send(data);

    //const createdPost = await createdResponse.body;

    // await request(app)
    //   .get("/posts/" + createdPost.id)
    //   .expect(404, createdPost);
  });

  console.log("Тестирование");

  // it("sould return 200 and empty array", async () => {
  //   await request(app).get("/posts/23234324").expect(404);
  // });
});
