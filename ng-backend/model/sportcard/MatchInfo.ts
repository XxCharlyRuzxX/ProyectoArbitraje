import Score from './Score';

export default class MatchInfo {
  competitionName: string;
  date: Date;
  time: string;
  fieldName: string;
  city: string;
  firstHalfStart: string;
  secondHalfStart: string;
  score: Score;
}
