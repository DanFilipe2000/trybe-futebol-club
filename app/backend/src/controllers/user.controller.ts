import { Request, Response } from 'express';
import CustomError from '../error/customError';
import ILogin from '../interfaces/ILogin';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.userService.login({ email, password } as ILogin);
      res.status(200).json({ token: result });
    } catch (err: unknown) {
      if (err instanceof CustomError) {
        res.status(err.status).json({ message: err.message });
      }
      // Tipando err, fonte: https://stackoverflow.com/questions/69021040/why-catch-clause-variable-type-annotation-must-be-any
    }

    // const { email, password } = req.body;
    // const result = await this.userService.login({ email, password } as ILogin);
    // res.status(200).json({ token: result });
  }
}
