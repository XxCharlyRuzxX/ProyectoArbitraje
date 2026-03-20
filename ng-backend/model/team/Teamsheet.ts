import TeamStaff from './TeamStaff';
import PlayersList from './players/PlayersList';
import SubstitutionList from './SubstitutionList';
import PlayerEntry from './players/PlayerEntry';
import TeamDiscipline from './discipline/TeamDiscipline';

export default class Teamsheet {
  readonly teamName: string;
  readonly captain: PlayerEntry;
  readonly players: PlayersList;
  readonly substitutions: SubstitutionList;
  readonly staff?: TeamStaff;
  readonly discipline?: TeamDiscipline;

  constructor(
    teamName: string,
    captain: PlayerEntry,
    staff: TeamStaff,
    players: PlayersList,
    substitutions: SubstitutionList,
  ) {
    this.teamName = teamName;
    this.captain = captain;
    this.staff = staff;
    this.players = players;
    this.substitutions = substitutions;

    this.validateCaptainInRoster();
  }

  private validateCaptainInRoster(): void {
    if (!this.players.findByNumber(this.captain.jerseyNumber)) {
      throw new Error(
        `El capitán ${this.captain.lastname} ${this.captain.firstname} no está en la lista de jugadores.`,
      );
    }
  }
}
