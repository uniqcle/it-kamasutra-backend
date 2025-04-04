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
import { ViewModel, NoTitleResponse } from "../models/PostViewModel";
import { getPostViewModel } from "../utils/getPostViewModel";


import { updatePostValidateMiddleware } from "../validation/post";
import { body, validationResult } from "express-validator";
import { inputValidationMiddlware } from "../middlewares/inputValidationMiddlware";

import { postService } from "../domain/postService";

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

    async (
      req: TypedQueryRequest<{ title: string }>,
      res: Response<ViewModel[]>
    ) => {
      const title = req.query.title?.toString();

      let filteredPosts: PostType[] = await postService.filterPost(title);

      //@ts-ignore
      console.log(filteredPosts);

      res.send(filteredPosts);
    }
  );

  // by id
  postRouter.get(
    "/:id",
    async (
      req: TypedParamsRequest<{ id: string }>,
      res: Response<ViewModel | number | null>
    ) => {
      const id = req.params.id;

      let post: PostType | null = await postService.getProductById(id);

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
    body("title")
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage("Заголовк не соответствует"),
    async (
      req: TypedBodyRequest<PostCreateModel>,
      res: Response<ViewModel | NoTitleResponse | { errors: {} }>
    ) => {
      // можно так по простому валидировать
      // if (!req.body.title) {
      //   res.status(400).send({ message: "title is required" });
      //   return;
      // }

      const resultValidation = validationResult(req);

      if (!resultValidation.isEmpty()) {
        res.status(400).send({ errors: resultValidation.array() });
        return;
      }

      let post: PostType | null = await postService.createPost(
        req.body.title,
        req.body.body
      );

      // type PostType на выводе подгоняем под модель PostViewModel,
      // которая предназначена конкретно для вывода
      //res.status(200).json(posts.map(getPostViewModel));

      let modifiedPostForView: ViewModel | null = getPostViewModel(post);

      res.status(200).json({ message: "Данные созданы" });
    }
  );

  /**************************************************
   * Put
   *************************************************/
  postRouter.put(
    "/:id",
    updatePostValidateMiddleware(),
    inputValidationMiddlware,
    async (
      req: TypedParamsBodyRequest<GetParamModel, PostCreateModel>,
      res: Response
    ) => {
      const id = req.params.id;

      let result = await postService.updatePost(
        id,
        req.body.title,
        req.body.body
      );

      if (result) {
        res.status(201).send("Post updated");
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
    async (req: TypedParamsRequest<GetParamModel>, res: Response) => {
      const id = req.params.id;

      let result = await postService.deletePost(id);

      if (result) {
        res.send(204);
      } else {
        res.send(404);
      }
    }
  );

  return postRouter;
};
