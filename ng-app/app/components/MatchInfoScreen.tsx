import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Field from "./forms/Field";
import StyledInput from "./forms/StyledInput";
import DatePickerField from "./forms/DatePickerField";
import TimeInput from "./forms/TimeInput";
import {
  MatchInfoForm,
  MatchInfoFormSchema,
} from "../schemas/sport-card-forms";
import { ZodError } from "zod";
import { UseToast } from "../hooks/UseToast";

type MatchInfoScreenProps = {
  initialData?: Partial<MatchInfoForm>;
  onNext: (data: MatchInfoForm) => void;
  onBack?: () => void;
};

export default function MatchInfoScreen({
  initialData,
  onNext,
  onBack,
}: MatchInfoScreenProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MatchInfoForm>({
    resolver: zodResolver(MatchInfoFormSchema),
    defaultValues: {
      competitionName: initialData?.competitionName ?? "Liga Municipal 2026",
      date: initialData?.date ?? new Date().toISOString().slice(0, 10),
      fieldName: initialData?.fieldName ?? "Estadio Municipal",
      city: initialData?.city ?? "Mérida",
      state: initialData?.state ?? "Yucatán",
      firstHalfStart: initialData?.firstHalfStart ?? "16:00",
      secondHalfStart: initialData?.secondHalfStart ?? "17:00",
      score: initialData?.score ?? {
        homeScore: 0,
        awayScore: 0,
      },
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const submit = async () => {
    try {
      await handleSubmit((data) => {
        onNext(data);
      })();
    } catch (error) {
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
        Datos del partido
      </Text>
      <Text className="text-xs text-neutral-400 mb-5">
        Información general del partido
      </Text>

      <Controller
        control={control}
        name="competitionName"
        render={({ field }) => (
          <Field label="Competición" error={errors.competitionName?.message}>
            <StyledInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Liga Municipal 2026"
              hasError={!!errors.competitionName}
            />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <DatePickerField
            label="Fecha del partido"
            value={field.value}
            onChange={field.onChange}
            error={errors.date?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="fieldName"
        render={({ field }) => (
          <Field label="Campo" error={errors.fieldName?.message}>
            <StyledInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Estadio Municipal"
              hasError={!!errors.fieldName}
            />
          </Field>
        )}
      />

      <View className="flex-row gap-3">
        <View className="flex-1">
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <Field label="Ciudad" error={errors.city?.message}>
                <StyledInput
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Mérida"
                  hasError={!!errors.city}
                />
              </Field>
            )}
          />
        </View>

        <View className="flex-1">
          <Controller
            control={control}
            name="state"
            render={({ field }) => (
              <Field label="Estado" error={errors.state?.message}>
                <StyledInput
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Yucatán"
                  hasError={!!errors.state}
                />
              </Field>
            )}
          />
        </View>
      </View>

      <Controller
        control={control}
        name="firstHalfStart"
        render={({ field }) => (
          <TimeInput
            label="Inicio 1er tiempo"
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.firstHalfStart?.message}
            optional
          />
        )}
      />

      <Controller
        control={control}
        name="secondHalfStart"
        render={({ field }) => (
          <TimeInput
            label="Inicio 2do tiempo"
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.secondHalfStart?.message}
            optional
          />
        )}
      />

      <View className="mt-6 flex-row gap-3">
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
