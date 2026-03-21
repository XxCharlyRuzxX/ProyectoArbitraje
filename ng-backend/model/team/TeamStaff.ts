export default class TeamStaff {
  readonly coach: string;
  readonly doctor?: string;
  readonly fitnessCoach?: string;
  readonly assistants?: string[];

  constructor(
    coach: string,
    doctor?: string,
    fitnessCoach?: string,
    assistants?: string[],
  ) {
    this.coach = coach;
    this.doctor = doctor;
    this.fitnessCoach = fitnessCoach;
    this.assistants = assistants;
  }
}
