import Team from '../database/models/team.model';
import ITeam from '../interfaces/ITeam';
// import CustomError from '../error/customError';

export default class TeamsService {
  public findAll = async (): Promise<ITeam[]> => {
    const teams: Team[] = await Team.findAll();
    return teams;
  };
}
