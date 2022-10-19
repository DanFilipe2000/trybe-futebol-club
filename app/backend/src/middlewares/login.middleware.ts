import { NextFunction, Request, Response } from 'express';

const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'All fields must be filled' });
  } else {
    next();
  }
};

export default loginMiddleware;
