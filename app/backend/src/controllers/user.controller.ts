import { Request, Response } from 'express';
import IUserService from '../interfaces/IUserService';
import ILogin from '../interfaces/ILogin';

export default class UserController {
  constructor(private userService: IUserService) {}

  public async login(req: Request, res: Response) {
    // try {
    //   const { email, password } = req.body;
    //   const result = await this.userService.login({ email, password } as ILogin);
    //   res.status(200).json({ token: result });
    // } catch (err: Error) {
    //   res.status(400).json({ message: err.message });
    // }

    const { email, password } = req.body;
    const result = await this.userService.login({ email, password } as ILogin);
    res.status(200).json({ token: result });
  }
}
