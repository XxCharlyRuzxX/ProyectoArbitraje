import PlayerEntry from './PlayerEntry';

export default class PlayersList {
  private items: PlayerEntry[] = [];

  findByNumber(n: number): PlayerEntry | undefined {
    return this.items.find((p) => p.jerseyNumber === n);
  }

  withGoals(): PlayerEntry[] {
    return this.items.filter((p) => p.goals() > 0);
  }

  totalGoals(): number {
    return this.items.reduce((sum, p) => sum + p.goals(), 0);
  }

  validate(): boolean {
    return this.items.length >= 11;
  }

  getPlayers(): PlayerEntry[]{
    return this.items
  }
}
