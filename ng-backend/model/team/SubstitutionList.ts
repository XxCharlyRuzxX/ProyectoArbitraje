import PlayersList from './players/PlayersList';
import Substitution from './Substitution';

export default class SubstitutionList {
  private items: Substitution[] = [];

  addSubstitution(substitution: Substitution, playersList: PlayersList): void {
    this.validatePlayersInRoster(substitution, playersList);
    this.validatePlayerNotAlreadySubstituted(substitution);
    this.validateNotSamePlayer(substitution);

    this.items.push(substitution);
  }

  getSubstitutions(): Substitution[] {
    return [...this.items];
  }

  addSubstitutions(
    substitutions: Substitution[],
    playersList: PlayersList,
  ): void {
    for (const substitution of substitutions) {
      this.validatePlayersInRoster(substitution, playersList);
      this.validatePlayerNotAlreadySubstituted(substitution);
      this.validateNotSamePlayer(substitution);

      this.items.push(substitution);
    }
  }

  private validatePlayersInRoster(
    substitution: Substitution,
    playersList: PlayersList,
  ): void {
    if (!playersList.findByNumber(substitution.playerIn.jerseyNumber)) {
      throw new Error(
        `${substitution.playerIn.firstname} no está en el equipo.`,
      );
    }
    if (!playersList.findByNumber(substitution.playerOut.jerseyNumber)) {
      throw new Error(
        `${substitution.playerOut.firstname} no está en el equipo.`,
      );
    }
  }

  private validatePlayerNotAlreadySubstituted(
    substitution: Substitution,
  ): void {
    const alreadyOut = this.items.some(
      (s) => s.playerOut.jerseyNumber === substitution.playerOut.jerseyNumber,
    );
    if (alreadyOut) {
      throw new Error(`${substitution.playerOut.firstname} ya fue sustituido.`);
    }
  }

  private validateNotSamePlayer(substitution: Substitution): void {
    if (
      substitution.playerIn.jerseyNumber === substitution.playerOut.jerseyNumber
    ) {
      throw new Error('Un jugador no puede sustituirse a sí mismo.');
    }
  }
}
