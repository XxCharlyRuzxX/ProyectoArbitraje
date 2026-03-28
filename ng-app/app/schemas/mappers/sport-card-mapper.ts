import { SportCardDraft } from "@/app/interfaces/sport-card";
import type { TeamForm } from "../sport-card-forms";
import type {
  PlayerEntry,
  Teamsheet,
  SportCard,
  CardEvent,
} from "../sport-card";

function findPlayerByJersey(
  players: PlayerEntry[],
  jerseyNumber: number,
): PlayerEntry {
  const player = players.find((p) => p.jerseyNumber === jerseyNumber);

  if (!player) {
    throw new Error(`Jugador con dorsal ${jerseyNumber} no encontrado.`);
  }

  return player;
}

function buildDateOnly(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function buildDateTime(dateString: string, timeString?: string): Date | undefined {
  if (!timeString) return undefined;

  const [year, month, day] = dateString.split("-").map(Number);
  const [hours, minutes] = timeString.split(":").map(Number);

  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

function buildCardEvents(
  players: PlayerEntry[],
  discipline: TeamForm["discipline"],
  cardType: "yellow" | "red",
): CardEvent[] {
  return discipline
    .filter((item) => item.cardType === cardType)
    .map((item) => ({
      player: findPlayerByJersey(players, item.playerJersey),
      reason: item.reason,
      description: item.description,
      minute: item.minute,
    }));
}

export function buildTeamsheet(form: TeamForm): Teamsheet {
  const players: PlayerEntry[] = form.players.map((player) => ({
    jerseyNumber: player.jerseyNumber,
    firstname: player.firstname,
    lastname: player.lastname,
    goalMinutes: player.goalMinutes ?? [],
  }));

  const captain = findPlayerByJersey(players, form.captainJerseyNumber);

  return {
    teamName: form.teamName,
    captain,
    staff: {
      coach: form.staff.coach,
      doctor: form.staff.doctor,
      fitnessCoach: form.staff.fitnessCoach,
      assistants: form.staff.assistants ?? [],
    },
    players,
    substitutions: form.substitutions.map((sub) => ({
      minute: sub.minute,
      playerOut: findPlayerByJersey(players, sub.playerOutJersey),
      playerIn: findPlayerByJersey(players, sub.playerInJersey),
    })),
    discipline: {
      yellowCards: buildCardEvents(players, form.discipline, "yellow"),
      redCards: buildCardEvents(players, form.discipline, "red"),
    },
  };
}

export function buildSportCard(draft: SportCardDraft): SportCard {
  if (!draft.matchInfo) {
    throw new Error("Falta matchInfo");
  }

  if (!draft.refereeCrew) {
    throw new Error("Falta refereeCrew");
  }

  if (!draft.homeTeam) {
    throw new Error("Falta homeTeam");
  }

  if (!draft.awayTeam) {
    throw new Error("Falta awayTeam");
  }

  return {
    refereeCrew: {
      referee: draft.refereeCrew.referee,
      assistant1: draft.refereeCrew.assistant1,
      assistant2: draft.refereeCrew.assistant2,
      fourthOfficial: draft.refereeCrew.fourthOfficial,
    },
    matchInfo: {
      competitionName: draft.matchInfo.competitionName,
      date: buildDateOnly(draft.matchInfo.date),
      fieldName: draft.matchInfo.fieldName,
      city: draft.matchInfo.city,
      state: draft.matchInfo.state,
      firstHalfStart: buildDateTime(draft.matchInfo.date, draft.matchInfo.firstHalfStart),
      secondHalfStart: buildDateTime(draft.matchInfo.date, draft.matchInfo.secondHalfStart),
      score: {
        homeScore: draft.homeTeam.players.reduce((sum, player) => sum + (player.goalMinutes?.length ?? 0), 0),
        awayScore: draft.awayTeam.players.reduce((sum, player) => sum + (player.goalMinutes?.length ?? 0), 0),
      },
    },
    homeTeam: buildTeamsheet(draft.homeTeam),
    awayTeam: buildTeamsheet(draft.awayTeam),
    observations:
      draft.observations?.observations
        ?.map((item) => item.trim())
        .filter(Boolean) ?? [],
  };
}
