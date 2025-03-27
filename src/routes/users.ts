import { Request, Response, Router } from "express"; 
import { userService } from "../domain/userService"; 

export const getUsersRoutes = () => {

	const userRouter = Router(); 

	userRouter.post("/", async (req: Request, res: Response) => {

		const newUser = await userService.createPost(req.body)

		res.status(200).send(newUser); 
	})


	return userRouter; 

}