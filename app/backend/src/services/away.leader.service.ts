import Team from '../database/models/team.model';
import Match from '../database/models/match.model';
import IMatches from '../interfaces/IMatches';
import IBoard from '../interfaces/IBoard';

// import CustomError from '../error/customError';

export default class AwayLeaderService {
  static allMatches = async () => {
    const finishMatches = await Match.findAll({ where: { inProgress: false } }) as IMatches[];
    return finishMatches;
  };

  static catchName = (team: number, teams: Team[]) => {
    const find = teams.find((e) => e.id === team);
    return find?.teamName;
  };

  static totalVictories = (team: number, matches: IMatches[]) => {
    const findMatches = matches.filter((e) => e.awayTeam === team);
    const victories = findMatches.filter((e) => e.homeTeamGoals < e.awayTeamGoals);
    return victories.length;
  };

  static totalDraws = (team: number, matches: IMatches[]) => {
    const findMatches = matches.filter((e) => e.awayTeam === team);
    const draws = findMatches.filter((e) => e.homeTeamGoals === e.awayTeamGoals);
    return draws.length;
  };

  static totalLosses = (team: number, matches: IMatches[]) => {
    const findMatches = matches.filter((e) => e.awayTeam === team);
    const losses = findMatches.filter((e) => e.homeTeamGoals > e.awayTeamGoals);
    return losses.length;
  };

  static totalPoints = (team: number, matches: IMatches[]) => {
    const victoriesPoints = AwayLeaderService.totalVictories(team, matches) * 3;
    const draw = AwayLeaderService.totalDraws(team, matches);
    return victoriesPoints + draw;
  };

  static totalGames = (team: number, matches: IMatches[]) => {
    const findMatches = matches.filter((e) => e.awayTeam === team);
    return findMatches.length;
  };

  static efficiency = (team: number, matches: IMatches[]) => {
    const totalPoints = AwayLeaderService.totalPoints(team, matches);
    const totalGames = AwayLeaderService.totalGames(team, matches);

    return +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  };

  static goalsFavor = (team: number, matches: IMatches[]) => {
    const findMatches = matches.filter((e) => e.awayTeam === team);
    const goals = findMatches.map((e) => e.awayTeamGoals);
    const soma = goals.reduce((a, b) => a + b, 0);
    return soma;
  };

  static goalsOwn = (team: number, matches: IMatches[]) => {
    const findMatches = matches.filter((e) => e.awayTeam === team);
    const goals = findMatches.map((e) => e.homeTeamGoals);
    const soma = goals.reduce((a, b) => a + b, 0);
    return soma;
  };

  static goalsBalance = (team: number, matches: IMatches[]) => {
    const goalsFavor = AwayLeaderService.goalsFavor(team, matches);
    const goalsOwn = AwayLeaderService.goalsOwn(team, matches);
    return goalsFavor - goalsOwn;
  };

  static sortResult = (table: IBoard[]) => {
    const result = table.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);

    const parsedArray = result.map((e) => JSON.stringify(e));
    const filteredArray = parsedArray.filter((value, ind) => parsedArray.indexOf(value) === ind)
      .map((e) => JSON.parse(e));

    return filteredArray;
  };

  public findAllAway = async () => {
    const teams: Team[] = await Team.findAll();
    const allMatches: IMatches[] = await AwayLeaderService.allMatches();
    const result = allMatches.map((e) => ({
      name: AwayLeaderService.catchName(e.awayTeam, teams),
      totalPoints: AwayLeaderService.totalPoints(e.awayTeam, allMatches),
      totalGames: AwayLeaderService.totalGames(e.awayTeam, allMatches),
      totalVictories: AwayLeaderService.totalVictories(e.awayTeam, allMatches),
      totalDraws: AwayLeaderService.totalDraws(e.awayTeam, allMatches),
      totalLosses: AwayLeaderService.totalLosses(e.awayTeam, allMatches),
      goalsFavor: AwayLeaderService.goalsFavor(e.awayTeam, allMatches),
      goalsOwn: AwayLeaderService.goalsOwn(e.awayTeam, allMatches),
      goalsBalance: AwayLeaderService.goalsBalance(e.awayTeam, allMatches),
      efficiency: AwayLeaderService.efficiency(e.awayTeam, allMatches),
    }));
    const sortResult = AwayLeaderService.sortResult(result as IBoard[]);
    return sortResult;
  };
}
