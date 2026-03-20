export default class PlayerEntry {
  jerseyNumber: number;
  lastname: string;
  firstname: string;
  private readonly _goalMinutes: number[] = [];

  constructor(jerseyNumber: number, lastname: string, firstname: string) {
    this.jerseyNumber = jerseyNumber;
    this.lastname = lastname;
    this.firstname = firstname;
  }

  addGoal(minute: number): void {
    if (minute < 0 || minute > 120) {
      throw new Error(`El minuto ${minute} no es válido.`);
    }
    this._goalMinutes.push(minute);
  }

  get goalMinutes(): number[] {
    return [...this._goalMinutes];
  }

  goals(): number {
    return this._goalMinutes.length;
  }
}
