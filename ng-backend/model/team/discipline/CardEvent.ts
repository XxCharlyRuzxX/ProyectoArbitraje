import PlayerEntry from '../players/PlayerEntry';

export default class CardEvent {
  player: PlayerEntry;
  reason: string;
  description: string;
  minute: number;
}
