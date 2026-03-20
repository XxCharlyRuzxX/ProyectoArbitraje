export default class Score {
  readonly homeScore: number;
  readonly awayScore: number;

  constructor(homeScore: number, awayScore: number) {
    this.validateNonNegative(homeScore);
    this.validateNonNegative(awayScore);
    this.homeScore = homeScore;
    this.awayScore = awayScore;
  }

  private validateNonNegative(score: number): void {
    if (score < 0) {
      throw new Error('Los goles no pueden ser negativos.');
    }
  }
}
