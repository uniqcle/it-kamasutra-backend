import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import { posts } from "./fake_data/posts";

const app = express();
const port = 3005;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  debugger;
  res.send("Hello World!!!!");
});

/**************************************************
 * Get
 *************************************************/
app.get("/posts", (req: Request, res: Response) => {
  const title = req.query.title?.toString();

  if (title) {
    const filteredPosts = posts.filter((p) => p.title.includes(title));
    res.send(filteredPosts);
  } else {
    res.send(posts);
  }
});

// by id
app.get("/posts/:id", (req: Request, res: Response) => {
  const id = +req.params.id;

  let product = posts.find((p) => p.id == id);

  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

/**************************************************
 * Post
 *************************************************/
app.post("/posts", (req: Request, res: Response) => {
  const newProduct = {
    id: +new Date(),
    userId: 1,
    title: req.body.title,
    body: req.body.body,
  };

  posts.push(newProduct);

  res.status(201).send(newProduct);
});

/**************************************************
 * Put
 *************************************************/
app.put("/posts/:id", (req: Request, res: Response) => {
  const id = +req.params.id;

  let post = posts.find((p) => p.id === id);
  if (post) {
    post.title = req.body.title;
    post.body = req.body.body;

    res.status(201).send(post);
  } else {
    res.sendStatus(404);
  }
});

/**************************************************
 * Delete
 *************************************************/
app.delete("/posts/:id", (req: Request, res: Response) => {
  const id = +req.params.id;

  //const deletedPost = posts.filter((p) => p.id !== id);
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === id) {
      posts.splice(i, 1);
      res.status(204).send(posts);
      return;
    }
  }

  res.send(404);
});







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
