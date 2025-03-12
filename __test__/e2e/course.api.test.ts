import request from "supertest";
import { app } from "../../src";

describe("/posts", () => {
  // it('should return 200 and empty array', () => {
  // 	expect(1).toBe(1)
  // })

  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  it("sould return 200 and array", async () => {
    await request(app)
      .get("/posts")
      .expect(200, [
        {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        },
        {
          userId: 1,
          id: 2,
          title: "qui est esse",
          body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
        },
      ]);
  });

  it("sould create post with correct input data", async () => {
    const createdResponse = await request(app)
      .post("/posts")
      .send({
        id: +new Date(),
        userId: 1,
        title: "Новый пост",
        body: "Тело нового поста",
      })
      .expect(201);

    const createdPost = await createdResponse.body;

    await request(app)
      .get("/posts/" + createdPost.id)
      .expect(200, createdPost);
  });
	
	console.log('Тестирование')

  it("sould return 200 and empty array", async () => {
    await request(app).get("/posts/23234324").expect(404);
  });
});
