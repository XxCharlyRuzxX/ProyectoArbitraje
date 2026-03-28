import { z } from "zod";

export const PlayerEntrySchema = z.object({
  jerseyNumber: z.number().int().min(0),
  lastname: z.string().min(1, "Apellido requerido"),
  firstname: z.string().min(1, "Nombre requerido"),
  goalMinutes: z.array(z.number().min(0).max(120)).default([]),
});

export const TeamStaffSchema = z.object({
  coach: z.string().min(1, "El entrenador es requerido"),
  doctor: z.string().optional(),
  fitnessCoach: z.string().optional(),
  assistants: z.array(z.string()).default([]),
});

export const ScoreSchema = z.object({
  homeScore: z.number().int().min(0),
  awayScore: z.number().int().min(0),
});

export const MatchInfoSchema = z
  .object({
    competitionName: z.string().min(1, "La competición es requerida"),
    date: z.date(),
    fieldName: z.string().min(1, "La cancha es requerida"),
    city: z.string().min(1, "La ciudad es requerida"),
    state: z.string().min(1, "El estado es requerido"),
    firstHalfStart: z.date().optional(),
    secondHalfStart: z.date().optional(),
    score: ScoreSchema,
  })
  .refine(
    (data) => {
      if (data.firstHalfStart && data.secondHalfStart) {
        return data.secondHalfStart > data.firstHalfStart;
      }
      return true;
    },
    {
      message: "El segundo tiempo debe iniciar después del primero.",
      path: ["secondHalfStart"],
    },
  )
  .refine(
    (data) => {
      if (data.secondHalfStart && !data.firstHalfStart) return false;
      return true;
    },
    {
      message: "No puede haber segundo tiempo sin primero.",
      path: ["secondHalfStart"],
    },
  );

export const RefereeCrewSchema = z.object({
  referee: z.string().min(1, "El árbitro principal es requerido"),
  assistant1: z.string().optional(),
  assistant2: z.string().optional(),
  fourthOfficial: z.string().optional(),
});

export const SubstitutionSchema = z
  .object({
    playerIn: PlayerEntrySchema,
    playerOut: PlayerEntrySchema,
    minute: z.number().int().min(0).max(120),
  })
  .refine(
    (data) => data.playerIn.jerseyNumber !== data.playerOut.jerseyNumber,
    { message: "Un jugador no puede sustituirse a sí mismo." },
  );

export const CardEventSchema = z.object({
  player: PlayerEntrySchema,
  reason: z.string().min(1, "El motivo es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  minute: z.number().int().min(0).max(120),
});

export const TeamDisciplineSchema = z.object({
  yellowCards: z.array(CardEventSchema).default([]),
  redCards: z.array(CardEventSchema).default([]),
});

export const TeamsheetSchema = z
  .object({
    teamName: z.string().min(1, "El nombre del equipo es requerido"),
    captain: PlayerEntrySchema,
    staff: TeamStaffSchema,
    players: z
      .array(PlayerEntrySchema)
      .min(1, "Debe haber al menos un jugador")
      .max(11, "No puede haber más de 11 jugadores"),
    substitutions: z.array(SubstitutionSchema).default([]),
    discipline: TeamDisciplineSchema,
  })
  .refine(
    (data) =>
      data.players.some(
        (p) =>
          p.jerseyNumber === data.captain.jerseyNumber &&
          p.lastname === data.captain.lastname &&
          p.firstname === data.captain.firstname,
      ),
    { message: "El capitán debe estar en la lista de jugadores." },
  )
  .refine(
    (data) => {
      const numbers = data.players.map((p) => p.jerseyNumber);
      return new Set(numbers).size === numbers.length;
    },
    { message: "Los dorsales deben ser únicos." },
  );

export const SportCardSchema = z
  .object({
    refereeCrew: RefereeCrewSchema,
    matchInfo: MatchInfoSchema,
    homeTeam: TeamsheetSchema,
    awayTeam: TeamsheetSchema,
    observations: z.array(z.string()).default([]),
  })
  .refine((data) => data.homeTeam.teamName !== data.awayTeam.teamName, {
    message: "Los equipos no pueden tener el mismo nombre.",
    path: ["awayTeam", "teamName"],
  });

export type PlayerEntry = z.infer<typeof PlayerEntrySchema>;
export type TeamStaff = z.infer<typeof TeamStaffSchema>;
export type Score = z.infer<typeof ScoreSchema>;
export type MatchInfo = z.infer<typeof MatchInfoSchema>;
export type RefereeCrew = z.infer<typeof RefereeCrewSchema>;
export type Substitution = z.infer<typeof SubstitutionSchema>;
export type CardEvent = z.infer<typeof CardEventSchema>;
export type TeamDiscipline = z.infer<typeof TeamDisciplineSchema>;
export type Teamsheet = z.infer<typeof TeamsheetSchema>;
export type SportCard = z.infer<typeof SportCardSchema>;