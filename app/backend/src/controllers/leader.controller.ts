import { Request, Response } from 'express';
import LeaderService from '../services/leader.service';

// import CustomError from '../error/customError';

export default class LeaderController {
  constructor(private leaderService = new LeaderService()) {}

  public getHome = async (_req: Request, res: Response) => {
    const matches = await this.leaderService.findAllHome();
    res.status(200).json(matches);
  };

  //   public post = async (req: Request, res: Response) => {
  //   };

  //   public patch = async (req: Request, res: Response) => {
  //   };
}
