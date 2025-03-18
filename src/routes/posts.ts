import express, { Request, Response, Express, NextFunction } from "express";
import { PostType } from "../fake_data/posts";
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
import { postRepository } from "../repositories/post_repos";

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
    (req: Request, res: Response, next: NextFunction) => {
      //@ts-ignore
      (req.blabla = "hello"), next();
    },

    (req: TypedQueryRequest<{ title: string }>, res: Response<ViewModel[]>) => {
      const title = req.query.title?.toString();

      let filteredPosts = postRepository.filterPost(title);

      //@ts-ignore
      console.log(req.blabla);

      res.send(filteredPosts);
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

      let post: PostType | undefined = postRepository.getProductById(id);

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
    (req: TypedBodyRequest<PostCreateModel>, res: Response<ViewModel>) => {
      if (!req.body.title) {
        res.sendStatus(400);
        return;
      }

      let post: PostType = postRepository.createPost(
        req.body.title,
        req.body.body
      );

      // type PostType на выводе подгоняем под модель PostViewModel,
      // которая предназначена конкретно для вывода
      //res.status(200).json(posts.map(getPostViewModel));

      let modifiedPostForView: ViewModel = getPostViewModel(post);

      res.status(200).json(modifiedPostForView);
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

      let updatedPost = postRepository.updatePost(
        id,
        req.body.title,
        req.body.body
      );

      if (updatedPost) {
        res.status(201).send(updatedPost);
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

      let posts = postRepository.deletePost(id);

      if (posts) {
        res.send(204);
      } else {
        res.send(404);
      }
    }
  );

  return postRouter;
};
