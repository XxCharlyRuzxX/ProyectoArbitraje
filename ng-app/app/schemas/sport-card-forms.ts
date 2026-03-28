import { z } from "zod";
import {
  PlayerEntrySchema,
  TeamStaffSchema,
  RefereeCrewSchema,
  ScoreSchema,
} from "./sport-card";

export const SubstitutionFormSchema = z
  .object({
    minute: z.number().int().min(0).max(120),
    playerOutJersey: z.number().int().min(0),
    playerInJersey: z.number().int().min(0),
  })
  .refine((data) => data.playerOutJersey !== data.playerInJersey, {
    message: "Un jugador no puede sustituirse a sí mismo.",
  });

export const DisciplineFormSchema = z.object({
  playerJersey: z.number().int().min(0),
  cardType: z.enum(["yellow", "red"]),
  minute: z.number().int().min(0).max(120),
  reason: z.string().min(1, "El motivo es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
});

export const MatchInfoFormSchema = z.object({
  competitionName: z.string().min(1, "La competición es requerida"),
  date: z.string().min(1, "La fecha es requerida"),
  fieldName: z.string().min(1, "La cancha es requerida"),
  city: z.string().min(1, "La ciudad es requerida"),
  state: z.string().min(1, "El estado es requerido"),
  firstHalfStart: z.string().optional(),
  secondHalfStart: z.string().optional(),
  score: ScoreSchema,
});

export const TeamFormSchema = z
  .object({
    teamName: z.string().min(1, "El nombre del equipo es requerido"),
    captainJerseyNumber: z.number().int().min(0),
    staff: TeamStaffSchema,
    players: z
      .array(PlayerEntrySchema)
      .min(1, "Debe haber al menos un jugador")
      .max(11, "No puede haber más de 11 jugadores"),
    substitutions: z.array(SubstitutionFormSchema).default([]),
    discipline: z.array(DisciplineFormSchema).default([]),
  })
  .refine(
    (data) =>
      data.players.some((p) => p.jerseyNumber === data.captainJerseyNumber),
    { message: "El capitán debe estar en la lista de jugadores." },
  )
  .refine(
    (data) => {
      const numbers = data.players.map((p) => p.jerseyNumber);
      return new Set(numbers).size === numbers.length;
    },
    { message: "Los dorsales deben ser únicos." },
  );

export const ObservationsFormSchema = z.object({
  observations: z
    .array(z.string().min(1, "La observación no puede estar vacía"))
    .default([]),
});

export const SportCardFormSchema = z.object({
  refereeCrew: RefereeCrewSchema,
  matchInfo: MatchInfoFormSchema,
  homeTeam: TeamFormSchema,
  awayTeam: TeamFormSchema,
  observations: ObservationsFormSchema,
});

export type SubstitutionForm = z.infer<typeof SubstitutionFormSchema>;
export type DisciplineForm = z.infer<typeof DisciplineFormSchema>;
export type TeamForm = z.infer<typeof TeamFormSchema>;
export type ObservationsForm = z.infer<typeof ObservationsFormSchema>;
export type SportCardForm = z.infer<typeof SportCardFormSchema>;
export type MatchInfoForm = z.infer<typeof MatchInfoFormSchema>;