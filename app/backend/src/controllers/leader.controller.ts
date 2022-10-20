import { Request, Response } from 'express';
import AwayLeaderService from '../services/away.leader.service';
import HomeLeaderService from '../services/home.leader.service';

// import CustomError from '../error/customError';

export default class LeaderController {
  constructor(
    private homeLeaderService = new HomeLeaderService(),
    private awayLeaderService = new AwayLeaderService(),
  ) {}

  public getHome = async (_req: Request, res: Response) => {
    const matches = await this.homeLeaderService.findAllHome();
    res.status(200).json(matches);
  };

  public getAway = async (_req: Request, res: Response) => {
    const matches = await this.awayLeaderService.findAllAway();
    res.status(200).json(matches);
  };

  //   public post = async (req: Request, res: Response) => {
  //   };

  //   public patch = async (req: Request, res: Response) => {
  //   };
}
