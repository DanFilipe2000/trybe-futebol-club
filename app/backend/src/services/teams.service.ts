import Team from '../database/models/team.model';
import ITeam from '../interfaces/ITeam';
// import CustomError from '../error/customError';

export default class TeamsService {
  public findAll = async (): Promise<ITeam[]> => {
    const teams: Team[] = await Team.findAll();
    return teams;
  };

  public findByPk = async (id: number): Promise<Team | null> => {
    const team: Team | null = await Team.findByPk(id);
    return team;
  };
}
