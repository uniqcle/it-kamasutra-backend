import express from "express";
import { getPostsRoutes } from './routes/posts';
import { getTestRouter } from './routes/test_endpoint'; 
import { getUsersRoutes } from "./routes/users";
import { authRouter } from "./routes/auth";

export const app = express();

app.use(express.json());

const postRouter = getPostsRoutes();
const userRouter = getUsersRoutes();

app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/login", authRouter); 


getTestRouter(app); 
