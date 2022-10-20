import { NextFunction, Request, Response } from 'express';
// import CustomError from '../error/customError';

export default class LoginMiddleware {
  public validate = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  };

  public validateToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(400).json({ message: 'Invalid Token' });
    }

    next();
  };
}
