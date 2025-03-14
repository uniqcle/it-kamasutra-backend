import express from "express";
import { getPostsRoutes } from './routes/posts';
import { getTestRouter } from './routes/test_endpoint'; 


export const app = express();

app.use(express.json());

const postRouter = getPostsRoutes(); 
app.use("/posts", postRouter); 

getTestRouter(app); 
