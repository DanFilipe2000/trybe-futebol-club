import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
// import CustomError from '../error/customError';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public get = async (_req: Request, res: Response) => {
    const matches = await this.matchesService.findAll();
    res.status(200).json(matches);
  };

  public post = async (req: Request, res: Response) => {
    const result = await this.matchesService.create(req.body);
    res.status(201).json(result);
  };
}
