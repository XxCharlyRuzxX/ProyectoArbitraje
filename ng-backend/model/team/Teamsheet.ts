import TeamStaff from './TeamStaff';
import PlayersList from './players/PlayersList';
import SubstitutionList from './SubstitutionList';

export default class Teamsheet {
  teamName: string;
  captain: string;
  staff: TeamStaff;
  players: PlayersList;
  substitutions: SubstitutionList;
}
