import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Field from "./forms/Field";
import StyledInput from "./forms/StyledInput";
import { TeamForm, TeamFormSchema } from "../schemas/sport-card-forms";
import { PlayerEntry } from "../schemas/sport-card";
import { ZodError } from "zod";
import { UseToast } from "../hooks/UseToast";

type MatchTeamsScreenProps = {
  title: string;
  initialData?: Partial<TeamForm>;
  onNext: (data: TeamForm) => void;
  onBack?: () => void;
};

const EMPTY_PLAYER = {
  jerseyNumber: 0,
  firstname: "",
  lastname: "",
  goalMinutes: [] as number[],
};

const EMPTY_SUBSTITUTION = {
  minute: 0,
  playerOutJersey: 0,
  playerInJersey: 0,
};

const EMPTY_DISCIPLINE = {
  playerJersey: 0,
  cardType: "yellow" as const,
  minute: 0,
  reason: "",
  description: "",
};

function PlayerSelect({
  players,
  value,
  onChange,
  label,
  error,
}: {
  players: PlayerEntry[];
  value: number;
  onChange: (jersey: number) => void;
  label: string;
  error?: string;
}) {
  return (
    <Field label={label} error={error}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
        contentContainerStyle={{ gap: 8 }}
      >
        {players.length === 0 && (
          <Text className="text-xs text-neutral-400 py-2">
            Agrega jugadores primero
          </Text>
        )}
        {players.map((p) => (
          <TouchableOpacity
            key={p.jerseyNumber}
            onPress={() => onChange(p.jerseyNumber)}
            className={`px-3 py-1.5 rounded-lg border ${
              value === p.jerseyNumber
                ? "bg-violet-600 border-violet-600"
                : "bg-white border-neutral-300"
            }`}
          >
            <Text
              className={`text-xs font-medium ${
                value === p.jerseyNumber ? "text-white" : "text-neutral-700"
              }`}
            >
              #{p.jerseyNumber} {p.lastname}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Field>
  );
}

function CardTypeSelect({
  value,
  onChange,
}: {
  value: "yellow" | "red";
  onChange: (v: "yellow" | "red") => void;
}) {
  return (
    <View className="flex-row gap-2 mb-4">
      {(["yellow", "red"] as const).map((type) => (
        <TouchableOpacity
          key={type}
          onPress={() => onChange(type)}
          className={`flex-1 h-9 rounded-lg border items-center justify-center ${
            value === type
              ? type === "yellow"
                ? "bg-amber-400 border-amber-400"
                : "bg-red-500 border-red-500"
              : "bg-white border-neutral-300"
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              value === type ? "text-white" : "text-neutral-500"
            }`}
          >
            {type === "yellow" ? "Amarilla" : "Roja"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function TeamScreen({
  title,
  initialData,
  onNext,
  onBack,
}: MatchTeamsScreenProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamForm>({
    resolver: zodResolver(TeamFormSchema),
    defaultValues: {
      teamName: initialData?.teamName ?? "",
      captainJerseyNumber: initialData?.captainJerseyNumber ?? 0,
      staff: {
        coach: initialData?.staff?.coach ?? "",
        doctor: initialData?.staff?.doctor ?? "",
        fitnessCoach: initialData?.staff?.fitnessCoach ?? "",
      },
      players: initialData?.players ?? [],
      substitutions: initialData?.substitutions ?? [],
      discipline: initialData?.discipline ?? [],
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const players = useWatch({ control, name: "players" }) ?? [];

  const {
    fields: playerFields,
    append: appendPlayer,
    remove: removePlayer,
  } = useFieldArray({ control, name: "players" });

  const {
    fields: subFields,
    append: appendSub,
    remove: removeSub,
  } = useFieldArray({ control, name: "substitutions" });

  const {
    fields: discFields,
    append: appendDisc,
    remove: removeDisc,
  } = useFieldArray({ control, name: "discipline" });

  const submit = async () => {
    try {
      await handleSubmit((data) => {
        onNext(data);
      })();
    } catch (error) {
      console.error("Excepción lanzada por Zod/schema:", error);

      const errorMessage =
        error instanceof ZodError
          ? error.issues[0].message
          : "Ocurrió un error desconocido";

      UseToast().error(errorMessage, "Campos inválidos");
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-50 w-full"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-lg font-medium text-neutral-900 mb-1">
        Datos del equipo {title}
      </Text>
      <Text className="text-xs text-neutral-400 mb-5">
        Jugadores, cambios y disciplina
      </Text>

      {/* ── Datos generales ── */}
      <Controller
        control={control}
        name="teamName"
        render={({ field }) => (
          <Field label="Nombre del equipo" error={errors.teamName?.message}>
            <StyledInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Deportivo Mérida"
              hasError={!!errors.teamName}
            />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="staff.coach"
        render={({ field }) => (
          <Field label="Entrenador" error={errors.staff?.coach?.message}>
            <StyledInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Nombre del entrenador"
              hasError={!!errors.staff?.coach}
            />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="staff.doctor"
        render={({ field }) => (
          <Field label="Médico" error={errors.staff?.doctor?.message} optional>
            <StyledInput
              value={field.value ?? ""}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Dr. Nombre"
            />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="staff.fitnessCoach"
        render={({ field }) => (
          <Field
            label="Entrenador físico"
            error={errors.staff?.fitnessCoach?.message}
            optional
          >
            <StyledInput
              value={field.value ?? ""}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Nombre del entrenador físico"
            />
          </Field>
        )}
      />

      {/* ── Jugadores ── */}
      <View className="mt-2">
        <Text className="text-sm font-medium text-neutral-700 mb-3">
          Jugadores ({playerFields.length}/11)
        </Text>

        {playerFields.map((item, index) => (
          <View
            key={item.id}
            className="mb-3 p-4 rounded-2xl bg-white border border-neutral-200"
          >
            <View className="flex-row gap-3 mb-2">
              {/* Dorsal */}
              <Controller
                control={control}
                name={`players.${index}.jerseyNumber`}
                render={({ field }) => (
                  <Field
                    label="Dorsal"
                    error={errors.players?.[index]?.jerseyNumber?.message}
                  >
                    <StyledInput
                      value={String(field.value ?? "")}
                      onChangeText={(t) =>
                        field.onChange(t === "" ? 0 : Number(t))
                      }
                      onBlur={field.onBlur}
                      placeholder="10"
                      keyboardType="numeric"
                      maxLength={2}
                      hasError={!!errors.players?.[index]?.jerseyNumber}
                    />
                  </Field>
                )}
              />
              {/* Nombre */}
              <View className="flex-1">
                <Controller
                  control={control}
                  name={`players.${index}.firstname`}
                  render={({ field }) => (
                    <Field
                      label="Nombre"
                      error={errors.players?.[index]?.firstname?.message}
                    >
                      <StyledInput
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="Carlos"
                        hasError={!!errors.players?.[index]?.firstname}
                      />
                    </Field>
                  )}
                />
              </View>
            </View>

            {/* Apellido */}
            <Controller
              control={control}
              name={`players.${index}.lastname`}
              render={({ field }) => (
                <Field
                  label="Apellido"
                  error={errors.players?.[index]?.lastname?.message}
                >
                  <StyledInput
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="García Hernández"
                    hasError={!!errors.players?.[index]?.lastname}
                  />
                </Field>
              )}
            />

            {/* Minutos de gol */}
            <Controller
              control={control}
              name={`players.${index}.goalMinutes`}
              render={({ field }) => (
                <Field label="Goles (minutos)" optional>
                  <StyledInput
                    value={field.value?.join(", ") ?? ""}
                    onChangeText={(t) =>
                      field.onChange(
                        t
                          .split(",")
                          .map((s) => Number(s.trim()))
                          .filter((n) => !isNaN(n) && n >= 0),
                      )
                    }
                    onBlur={field.onBlur}
                    placeholder="23, 67"
                    keyboardType="numbers-and-punctuation"
                  />
                </Field>
              )}
            />

            <TouchableOpacity
              onPress={() => removePlayer(index)}
              className="mt-1 h-9 rounded-xl bg-red-50 border border-red-200 items-center justify-center"
            >
              <Text className="text-xs text-red-500 font-medium">
                Eliminar jugador
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          onPress={() => appendPlayer({ ...EMPTY_PLAYER })}
          className="h-11 rounded-xl border border-dashed border-neutral-300 items-center justify-center mb-1"
        >
          <Text className="text-sm text-neutral-400">+ Agregar jugador</Text>
        </TouchableOpacity>

        {errors.players?.root?.message && (
          <Text className="text-xs text-red-400 mt-1">
            {errors.players.root.message}
          </Text>
        )}
      </View>

      {/* ── Capitán ── */}
      <View className="mt-4">
        <Text className="text-sm font-medium text-neutral-700 mb-2">
          Capitán
        </Text>
        <Controller
          control={control}
          name="captainJerseyNumber"
          render={({ field }) => (
            <PlayerSelect
              players={players}
              value={field.value}
              onChange={field.onChange}
              label="Selecciona el capitán"
              error={errors.captainJerseyNumber?.message}
            />
          )}
        />
        {errors.root?.message && (
          <Text className="text-xs text-red-400 mt-1">
            {errors.root.message}
          </Text>
        )}
      </View>

      {/* ── Sustituciones ── */}
      <View className="mt-6">
        <Text className="text-sm font-medium text-neutral-700 mb-3">
          Sustituciones ({subFields.length})
        </Text>

        {subFields.map((item, index) => (
          <View
            key={item.id}
            className="mb-3 p-4 rounded-2xl bg-white border border-neutral-200"
          >
            <Controller
              control={control}
              name={`substitutions.${index}.minute`}
              render={({ field }) => (
                <Field
                  label="Minuto"
                  error={errors.substitutions?.[index]?.minute?.message}
                >
                  <StyledInput
                    value={String(field.value ?? "")}
                    onChangeText={(t) =>
                      field.onChange(t === "" ? 0 : Number(t))
                    }
                    onBlur={field.onBlur}
                    placeholder="55"
                    keyboardType="numeric"
                    maxLength={3}
                    hasError={!!errors.substitutions?.[index]?.minute}
                  />
                </Field>
              )}
            />

            <Controller
              control={control}
              name={`substitutions.${index}.playerOutJersey`}
              render={({ field }) => (
                <PlayerSelect
                  players={players}
                  value={field.value}
                  onChange={field.onChange}
                  label="Sale"
                  error={
                    errors.substitutions?.[index]?.playerOutJersey?.message
                  }
                />
              )}
            />

            <Controller
              control={control}
              name={`substitutions.${index}.playerInJersey`}
              render={({ field }) => (
                <PlayerSelect
                  players={players}
                  value={field.value}
                  onChange={field.onChange}
                  label="Entra"
                  error={errors.substitutions?.[index]?.playerInJersey?.message}
                />
              )}
            />

            {errors.substitutions?.[index]?.root?.message && (
              <Text className="text-xs text-red-400 mb-2">
                {errors.substitutions[index]?.root?.message}
              </Text>
            )}

            <TouchableOpacity
              onPress={() => removeSub(index)}
              className="h-9 rounded-xl bg-red-50 border border-red-200 items-center justify-center"
            >
              <Text className="text-xs text-red-500 font-medium">
                Eliminar sustitución
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          onPress={() => appendSub({ ...EMPTY_SUBSTITUTION })}
          className="h-11 rounded-xl border border-dashed border-amber-300 items-center justify-center mb-1"
        >
          <Text className="text-sm text-amber-500">+ Agregar sustitución</Text>
        </TouchableOpacity>
      </View>

      {/* ── Disciplina ── */}
      <View className="mt-6">
        <Text className="text-sm font-medium text-neutral-700 mb-3">
          Disciplina ({discFields.length})
        </Text>

        {discFields.map((item, index) => (
          <View
            key={item.id}
            className="mb-3 p-4 rounded-2xl bg-white border border-neutral-200"
          >
            <Controller
              control={control}
              name={`discipline.${index}.cardType`}
              render={({ field }) => (
                <CardTypeSelect value={field.value} onChange={field.onChange} />
              )}
            />

            <Controller
              control={control}
              name={`discipline.${index}.playerJersey`}
              render={({ field }) => (
                <PlayerSelect
                  players={players}
                  value={field.value}
                  onChange={field.onChange}
                  label="Jugador"
                  error={errors.discipline?.[index]?.playerJersey?.message}
                />
              )}
            />

            <Controller
              control={control}
              name={`discipline.${index}.minute`}
              render={({ field }) => (
                <Field
                  label="Minuto"
                  error={errors.discipline?.[index]?.minute?.message}
                >
                  <StyledInput
                    value={String(field.value ?? "")}
                    onChangeText={(t) =>
                      field.onChange(t === "" ? 0 : Number(t))
                    }
                    onBlur={field.onBlur}
                    placeholder="34"
                    keyboardType="numeric"
                    maxLength={3}
                    hasError={!!errors.discipline?.[index]?.minute}
                  />
                </Field>
              )}
            />

            <Controller
              control={control}
              name={`discipline.${index}.reason`}
              render={({ field }) => (
                <Field
                  label="Motivo"
                  error={errors.discipline?.[index]?.reason?.message}
                >
                  <StyledInput
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Juego brusco"
                    hasError={!!errors.discipline?.[index]?.reason}
                  />
                </Field>
              )}
            />

            <Controller
              control={control}
              name={`discipline.${index}.description`}
              render={({ field }) => (
                <Field
                  label="Descripción"
                  error={errors.discipline?.[index]?.description?.message}
                >
                  <StyledInput
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Entrada fuerte por detrás..."
                    hasError={!!errors.discipline?.[index]?.description}
                    multiline
                    numberOfLines={2}
                  />
                </Field>
              )}
            />

            <TouchableOpacity
              onPress={() => removeDisc(index)}
              className="h-9 rounded-xl bg-red-50 border border-red-200 items-center justify-center"
            >
              <Text className="text-xs text-red-500 font-medium">
                Eliminar tarjeta
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          onPress={() => appendDisc({ ...EMPTY_DISCIPLINE })}
          className="h-11 rounded-xl border border-dashed border-red-300 items-center justify-center"
        >
          <Text className="text-sm text-red-400">+ Agregar tarjeta</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-8 flex-row gap-3">
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            className="flex-1 h-11 rounded-xl border border-neutral-300 items-center justify-center"
          >
            <Text className="text-neutral-700 text-sm font-medium">Atrás</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={submit}
          className="flex-1 h-11 bg-blue-500 rounded-xl items-center justify-center"
        >
          <Text className="text-white text-sm font-medium">Siguiente →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
