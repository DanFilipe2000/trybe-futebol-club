import Match from '../database/models/match.model';

export default interface IMatches extends Match{
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean | undefined;
  teamHome: {
    teamName: string;
  }
  teamAway: {
    teamName: string;
  }
}
