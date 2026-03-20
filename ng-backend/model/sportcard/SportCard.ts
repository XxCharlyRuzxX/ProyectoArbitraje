import RefereeCrew from '../team/RefereeCrew';
import MatchInfo from './MatchInfo';
import Teamsheet from '../team/Teamsheet';

export default class SportCard {
  readonly idCard: string;
  readonly refereeCrew: RefereeCrew;
  readonly matchInfo: MatchInfo;
  readonly homeTeam: Teamsheet;
  readonly awayTeam: Teamsheet;
  readonly observations?: string[];

  constructor(
    idCard: string,
    refereeCrew: RefereeCrew,
    matchInfo: MatchInfo,
    homeTeam: Teamsheet,
    awayTeam: Teamsheet,
    observations?: string[],
  ) {
    this.validateTeams();
    this.idCard = idCard;
    this.refereeCrew = refereeCrew;
    this.matchInfo = matchInfo;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.observations = observations;
  }

  private validateTeams(): void {
    if (this.homeTeam.teamName === this.awayTeam.teamName) {
      throw new Error('Los equipos no pueden tener el mismo nombre.');
    }
  }
}
