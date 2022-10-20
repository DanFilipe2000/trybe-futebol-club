import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import TeamsService from '../services/teams.service';
// import CustomError from '../error/customError';

export default class MatchesMiddleware {
  constructor(
    private teamsService = new TeamsService(),
    private userService = new UserService(),
  ) {}

  public validateTeams = (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    next();
  };

  public validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    const tokenError = 'Token must be a valid token';

    if (!authorization) {
      return res.status(401).json({ message: tokenError });
    }

    try {
      const { userId } = await this.userService.validate(authorization);
      const user = await this.userService.findByPk(userId);

      if (!user) {
        return res.status(401).json({ message: tokenError });
      }
    } catch (error) {
      return res.status(401).json({ message: tokenError });
    }

    next();
  };

  public validateIfExists = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    const homeTeamExists = await this.teamsService.findByPk(homeTeam);
    const awayTeamExists = await this.teamsService.findByPk(awayTeam);

    if (!homeTeamExists || !awayTeamExists) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  };
}
