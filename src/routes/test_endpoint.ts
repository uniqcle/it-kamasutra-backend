import { Request, Response, Express } from "express";

export const getTestRouter = (app: Express) => {

  app.delete("/__test__/data", (req: Request, res: Response) => {
    console.log('test delete')
    res.status(201).send('Тест passed delete');
  });


};
