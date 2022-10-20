import Team from '../database/models/team.model';
import Match from '../database/models/match.model';
import IMatches from '../interfaces/IMatches';
import IBoard from '../interfaces/IBoard';

// import CustomError from '../error/customError';

export default class HomeLeaderService {
  static allMatches = async () => {
    const finishMatches = await Match.findAll({ where: { inProgress: false } }) as IMatches[];
    return finishMatches;
  };

  static catchName = (team: number, teams: Team[]) => {
    const find = teams.find((e) => e.id === team);
    return find?.teamName;
  };

  static totalVictories = (team: number, matches: IMatches[]) => {
    const findMatches = matches.filter((e) => e.homeTeam === team);
    const victories = findMatches.filter((e) => e.homeTeamGoals > e.awayTeamGoals);
    return victories.length;
  };

  static totalDraws = (team: number, matches: IMatches[]) => {
    const findMatches = matches.filter((e) => e.homeTeam === team);
    const draws = findMatches.filter((e) => e.homeTeamGoals === e.awayTeamGoals);
    return draws.length;
  };

  static totalLosses = (team: number, matches: IMatches[]) => {
    const findMatches = matches.filter((e) => e.homeTeam === team);
    const losses = findMatches.filter((e) => e.homeTeamGoals < e.awayTeamGoals);
    return losses.length;
  };

  static totalPoints = (team: number, matches: IMatches[]) => {
    const victoriesPoints = HomeLeaderService.totalVictories(team, matches) * 3;
    const draw = HomeLeaderService.totalDraws(team, matches);
    return victoriesPoints + draw;
  };

  static totalGames = (team: number, matches: IMatches[]) => {
    const findMatches = matches.filter((e) => e.homeTeam === team);
    return findMatches.length;
  };

  static efficiency = (team: number, matches: IMatches[]) => {
    const totalPoints = HomeLeaderService.totalPoints(team, matches);
    const totalGames = HomeLeaderService.totalGames(team, matches);

    return +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  };

  static goalsFavor = (team: number, matches: IMatches[]) => {
    const findMatches = matches.filter((e) => e.homeTeam === team);
    const goals = findMatches.map((e) => e.homeTeamGoals);
    const soma = goals.reduce((a, b) => a + b, 0);
    return soma;
  };

  static goalsOwn = (team: number, matches: IMatches[]) => {
    const findMatches = matches.filter((e) => e.homeTeam === team);
    const goals = findMatches.map((e) => e.awayTeamGoals);
    const soma = goals.reduce((a, b) => a + b, 0);
    return soma;
  };

  static goalsBalance = (team: number, matches: IMatches[]) => {
    const goalsFavor = HomeLeaderService.goalsFavor(team, matches);
    const goalsOwn = HomeLeaderService.goalsOwn(team, matches);
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

  public findAllHome = async () => {
    const teams: Team[] = await Team.findAll();
    const allMatches: IMatches[] = await HomeLeaderService.allMatches();
    const result = allMatches.map((e) => ({
      name: HomeLeaderService.catchName(e.homeTeam, teams),
      totalPoints: HomeLeaderService.totalPoints(e.homeTeam, allMatches),
      totalGames: HomeLeaderService.totalGames(e.homeTeam, allMatches),
      totalVictories: HomeLeaderService.totalVictories(e.homeTeam, allMatches),
      totalDraws: HomeLeaderService.totalDraws(e.homeTeam, allMatches),
      totalLosses: HomeLeaderService.totalLosses(e.homeTeam, allMatches),
      goalsFavor: HomeLeaderService.goalsFavor(e.homeTeam, allMatches),
      goalsOwn: HomeLeaderService.goalsOwn(e.homeTeam, allMatches),
      goalsBalance: HomeLeaderService.goalsBalance(e.homeTeam, allMatches),
      efficiency: HomeLeaderService.efficiency(e.homeTeam, allMatches),
    }));
    const sortResult = HomeLeaderService.sortResult(result as IBoard[]);
    return sortResult;
  };
}
