import { Router, Request, Response } from "express";
import { feedbackService } from "../domain/feedbackService";
import { authMiddleware } from "../middlewares/authMiddleware";

export const feedbackRouter = Router({});

feedbackRouter
  .post(
    "/",
    // проверка на аутентификацию
    authMiddleware,
    async (req: Request, res: Response) => {
      const newFeedback = await feedbackService.create({
        comment: req.body.comment,
        userId: req.user!._id,
      });

      res.status(201).send(newFeedback);
    }
  )
  .get("/", async (req: Request, res: Response) => {
    const feedbacks = await feedbackService.getAll();

    res.send(feedbacks);
  });
