
import { Request, Response, Router } from 'express'; 
import { userService } from '../domain/userService';

export const authRouter = Router(); 

authRouter.post('/', async (req: Request, res: Response) => {
	const checkResult = await userService.checkCredentials(req.body.email, req.body.password); 

	res.status(200).send(checkResult); 
})