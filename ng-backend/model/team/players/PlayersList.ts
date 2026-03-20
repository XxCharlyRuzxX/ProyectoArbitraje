import PlayerEntry from './PlayerEntry';

export default class PlayersList {
  private items: PlayerEntry[] = [];
  private static readonly MAX_PLAYERS = 11;

  addPlayer(player: PlayerEntry): void {
    this.validateMaxPlayers();
    this.validateUniqueJerseyNumber(player);
    this.items.push(player);
  }

  addPlayers(players: PlayerEntry[]): void {
    players.forEach((player) => {
      this.validateMaxPlayers();
      this.validateUniqueJerseyNumber(player);
      this.addPlayer(player);
    });
  }

  private validateMaxPlayers(): void {
    if (this.items.length >= PlayersList.MAX_PLAYERS) {
      throw new Error('No se pueden agregar más de 11 jugadores.');
    }
  }

  private validateUniqueJerseyNumber(player: PlayerEntry): void {
    if (this.findByNumber(player.jerseyNumber)) {
      throw new Error(`El dorsal ${player.jerseyNumber} ya está en uso.`);
    }
  }

  findByNumber(n: number): PlayerEntry | undefined {
    return this.items.find((p) => p.jerseyNumber === n);
  }

  withGoals(): PlayerEntry[] {
    return this.items.filter((p) => p.goals() > 0);
  }

  totalGoals(): number {
    return this.items.reduce((sum, p) => sum + p.goals(), 0);
  }

  getPlayers(): PlayerEntry[] {
    return [...this.items];
  }
}
