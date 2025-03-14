import express, { Request, Response, Express } from "express";
import { PostType, posts } from "../fake_data/posts";
import {
  TypedBodyRequest,
  TypedParamsBodyRequest,
  TypedParamsRequest,
  TypedQueryRequest,
} from "../types";
import { PostCreateModel } from "../models/PostCreateModel";
import { GetParamModel } from "../models/GetParamModel";
import { ViewModel } from "../models/PostViewModel";
import { getPostViewModel } from "../utils/getPostViewModel";

export const getPostsRoutes = () => {
  const postRouter = express.Router();

  //   postRouter.get("/", (req: Request, res: Response) => {
  //     debugger;
  //     res.send("Hello World!!!!");
  //   });

  /**************************************************
   * Get
   *************************************************/
  // app.get(
  //   "/posts",
  //   (
  //     req: Request<
  //       {}, // url params - ничего не передаем
  //       {}, // response, то что возвращаем req.res (аналог request)
  //       {}, // request body ничего не прилетает с запросом
  //       { title: string } // Request query
  //       // headers
  //       // multipart/form-data
  //     >,
  //     res: Response<PostType[]>
  //   ) => {
  //     const title = req.query.title?.toString();

  postRouter.get(
    "/",
    (req: TypedQueryRequest<{ title: string }>, res: Response<ViewModel[]>) => {
      const title = req.query.title?.toString();

      if (title) {
        const filteredPosts = posts.filter((p) => p.title.includes(title));
        res.send(filteredPosts);
      } else {
        res.json(posts);
      }
    }
  );

  // by id
  postRouter.get(
    "/:id",
    (
      req: TypedParamsRequest<{ id: string }>,
      res: Response<ViewModel | number>
    ) => {
      const id = +req.params.id;

      let post = posts.find((p) => p.id == id);

      if (post) {
        res.status(200).send(getPostViewModel(post));
      } else {
        res.send(404);
      }
    }
  );

  /**************************************************
   * Post
   *************************************************/
  postRouter.post(
    "/",
    (req: TypedBodyRequest<PostCreateModel>, res: Response<ViewModel[]>) => {
      if (!req.body.title) {
        res.sendStatus(400);
        return;
      }

      const newProduct: PostType = {
        id: +new Date(),
        userId: 1,
        title: req.body.title,
        body: req.body.body,
        totalCount: 10,
      };

      posts.push(newProduct);

      // type PostType на выводе подгоняем под модель PostViewModel,
      // которая предназначена конкретно для вывода
      res.status(200).json(posts.map(getPostViewModel));
    }
  );

  /**************************************************
   * Put
   *************************************************/
  postRouter.put(
    "/:id",
    (
      req: TypedParamsBodyRequest<GetParamModel, PostCreateModel>,
      res: Response
    ) => {
      const id = +req.params.id;

      let post = posts.find((p) => p.id === id);
      if (post) {
        post.title = req.body.title;
        post.body = req.body.body;

        res.status(201).send(post);
      } else {
        res.sendStatus(404);
      }
    }
  );

  /**************************************************
   * Delete
   *************************************************/
  postRouter.delete(
    "/:id",
    (req: TypedParamsRequest<GetParamModel>, res: Response) => {
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
    }
  );

  return postRouter;
};
