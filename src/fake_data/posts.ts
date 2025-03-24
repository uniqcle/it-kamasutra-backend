type PostType = {
  _id?: string;
  id: string | number;
  userId: number;
  title: string;
  body: string;
  totalCount: number;
};

const posts: PostType[] = [
  {
    _id: "67e0ca1775769c2f4d67ddf2",
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    totalCount: 10,
  },
  {
    _id: "67e0ca2f75769c2f4d67ddf3",
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    totalCount: 10,
  },
];

export { PostType, posts };
