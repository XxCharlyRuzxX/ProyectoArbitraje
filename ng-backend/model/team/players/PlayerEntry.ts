export default class PlayerEntry {
  jerseyNumber: number;
  lastname: string;
  firstname: string;
  goalMinutes: number[];

  goals(): number {
    return this.goalMinutes.length;
  }
}
