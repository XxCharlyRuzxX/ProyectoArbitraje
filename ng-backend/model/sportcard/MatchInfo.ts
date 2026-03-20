import Score from './Score';

export default class MatchInfo {
  readonly competitionName: string;
  readonly date: Date;
  readonly fieldName: string;
  readonly city: string;
  readonly state: string;
  readonly firstHalfStart?: Date;
  readonly secondHalfStart?: Date;
  readonly score: Score;

  constructor(
    competitionName: string,
    date: Date,
    fieldName: string,
    city: string,
    state: string,
    score: Score,
    firstHalfStart?: Date,
    secondHalfStart?: Date,
  ) {
    if (firstHalfStart && firstHalfStart < date) {
      throw new Error('El primer tiempo no puede iniciar antes del partido.');
    }
    if (
      firstHalfStart &&
      secondHalfStart &&
      secondHalfStart <= firstHalfStart
    ) {
      throw new Error('El segundo tiempo debe iniciar después del primero.');
    }
    if (secondHalfStart && !firstHalfStart) {
      throw new Error('No puede haber segundo tiempo sin primero.');
    }

    this.competitionName = competitionName;
    this.date = date;
    this.fieldName = fieldName;
    this.city = city;
    this.state = state;
    this.score = score;
    this.firstHalfStart = firstHalfStart;
    this.secondHalfStart = secondHalfStart;
  }
}
