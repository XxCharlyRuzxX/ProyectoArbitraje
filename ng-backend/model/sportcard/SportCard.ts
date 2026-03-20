import RefereeCrew from '../team/RefereeCrew';
import MatchInfo from './MatchInfo';
import Teamsheet from '../team/Teamsheet';
import DisciplinaryReport from '../team/discipline/DisciplinaryReport';

export default class SportCard {
  idCard: string;
  refereeCrew: RefereeCrew;
  matchInfo: MatchInfo;
  homeTeam: Teamsheet;
  awayTeam: Teamsheet;
  disciplinaryReport: DisciplinaryReport;
  observations: string[];
}
