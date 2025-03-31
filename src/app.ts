import express from "express";
import { getPostsRoutes } from "./routes/posts";
import { getUsersRoutes } from "./routes/users";
import { authRouter } from "./routes/auth";
import { feedbackRouter } from "./routes/feedback";
import { getTestRouter } from "./routes/test_endpoint";

export const app = express();

app.use(express.json());

const postRouter = getPostsRoutes();
const userRouter = getUsersRoutes();

app.use("/posts", postRouter);
app.use("/register", userRouter);
app.use("/login", authRouter);
app.use("/feedback", feedbackRouter);


getTestRouter(app); 
