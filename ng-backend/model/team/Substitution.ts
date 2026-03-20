import PlayerEntry from './players/PlayerEntry';

export default class Substitution {
  readonly playerIn: PlayerEntry;
  readonly playerOut: PlayerEntry;
  readonly minute: number;

  constructor(playerIn: PlayerEntry, playerOut: PlayerEntry, minute: number) {
    this.validateMinute(minute);
    this.validateNotSamePlayer(playerIn, playerOut);
    this.playerIn = playerIn;
    this.playerOut = playerOut;
    this.minute = minute;
  }

  private validateMinute(minute: number): void {
    if (minute < 0 || minute > 120) {
      throw new Error(`El minuto ${minute} no es válido.`);
    }
  }

  private validateNotSamePlayer(
    playerIn: PlayerEntry,
    playerOut: PlayerEntry,
  ): void {
    if (playerIn.jerseyNumber === playerOut.jerseyNumber) {
      throw new Error(
        'El jugador entrante y el saliente no pueden ser el mismo.',
      );
    }
  }
}
