export default interface IMatches {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean | undefined;
  teamHome?: {
    teamName: string;
  }
  teamAway?: {
    teamName: string;
  }
}
