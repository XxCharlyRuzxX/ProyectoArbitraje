import PlayerEntry from '../players/PlayerEntry';

export default class CardEvent {
  readonly player: PlayerEntry;
  readonly reason: string;
  readonly description: string;
  readonly minute: number;

  constructor(
    player: PlayerEntry,
    reason: string,
    description: string,
    minute: number,
  ) {
    this.validateMinute(minute);
    this.player = player;
    this.reason = reason;
    this.description = description;
    this.minute = minute;
  }

  private validateMinute(minute: number): void {
    if (minute < 0 || minute > 120) {
      throw new Error(`El minuto ${minute} no es válido.`);
    }
  }
}
