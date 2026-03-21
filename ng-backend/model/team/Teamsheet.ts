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
  readonly staff: TeamStaff;
  readonly discipline: TeamDiscipline;

  constructor(
    teamName: string,
    captain: PlayerEntry,
    players: PlayersList,
    substitutions: SubstitutionList,
    staff: TeamStaff,
    discipline: TeamDiscipline,
  ) {
    this.teamName = teamName;
    this.captain = captain;
    this.staff = staff;
    this.players = players;
    this.substitutions = substitutions;
    this.discipline = discipline;
    this.validateCaptainInRoster();
  }

  private validateCaptainInRoster(): void {
    const exists = this.players
      .getPlayers()
      .some(
        (p) =>
          p.jerseyNumber === this.captain.jerseyNumber &&
          p.lastname === this.captain.lastname &&
          p.firstname === this.captain.firstname,
      );

    if (!exists) {
      throw new Error(
        `El capitán ${this.captain.lastname} ${this.captain.firstname} no está en la lista de jugadores.`,
      );
    }
  }
}
