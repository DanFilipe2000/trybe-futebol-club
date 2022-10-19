import { Request, Response } from 'express';
// import CustomError from '../error/customError';
// import ILogin from '../interfaces/ILogin';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public get = async (_req: Request, res: Response) => {
    const teams = await this.teamsService.findAll();
    res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamsService.findByPk(+id);
    res.status(200).json(team);
  };
}
