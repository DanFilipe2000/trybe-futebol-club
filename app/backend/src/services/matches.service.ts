import Team from '../database/models/team.model';
import Match from '../database/models/match.model';
import IMatches from '../interfaces/IMatches';

// import CustomError from '../error/customError';

export default class MatchesService {
  public findAll = async (): Promise<IMatches[]> => {
    const matches: IMatches[] = await Match.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'],
      },
      ],
    });

    return matches;
  };

  public create = async (body: Match) => {
    const create = await Match.create({ ...body, inProgress: true });
    return create;
  };
}
