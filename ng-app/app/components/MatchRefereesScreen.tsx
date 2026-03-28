import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Field from "./forms/Field";
import StyledInput from "./forms/StyledInput";
import { RefereeCrew, RefereeCrewSchema } from "../schemas/sport-card";
import { ZodError } from "zod";
import Toast from "react-native-toast-message";

type MatchRefereesScreenProps = {
  initialData?: Partial<RefereeCrew>;
  onNext: (data: RefereeCrew) => void;
  onBack?: () => void;
};

export default function MatchRefereesScreen({
  initialData,
  onNext,
  onBack,
}: MatchRefereesScreenProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RefereeCrew>({
    resolver: zodResolver(RefereeCrewSchema),
    defaultValues: {
      referee: initialData?.referee ?? "Carlos Israel Ruz",
      assistant1: initialData?.assistant1 ?? "",
      assistant2: initialData?.assistant2 ?? "",
      fourthOfficial: initialData?.fourthOfficial ?? "",
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
      console.error("Excepción lanzada por Zod/schema:", error);

      const errorMessage =
        error instanceof ZodError
          ? error.issues.map((issue) => issue.message).join(", ")
          : "Ocurrió un error desconocido";

      Toast.show({
        type: "error",
        text1: "Campos inválidos",
        text2: errorMessage,
        position: "bottom",
        bottomOffset: 40,
      });
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-50 w-full"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-lg font-medium text-neutral-900 mb-1">
        Datos Arbitrales
      </Text>
      <Text className="text-xs text-neutral-400 mb-5">
        Información del cuerpo arbitral
      </Text>

      <Controller
        control={control}
        name="referee"
        render={({ field }) => (
          <Field label="Árbitro principal" error={errors.referee?.message}>
            <StyledInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Arbitro principal"
              hasError={!!errors.referee}
            />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="assistant1"
        render={({ field }) => (
          <Field label="Árbitro auxiliar 1" error={errors.assistant1?.message}>
            <StyledInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Árbitro auxiliar 1"
              hasError={!!errors.assistant1}
            />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="assistant2"
        render={({ field }) => (
          <Field label="Árbitro auxiliar 2" error={errors.assistant2?.message}>
            <StyledInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Árbitro auxiliar 2"
              hasError={!!errors.assistant2}
            />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="fourthOfficial"
        render={({ field }) => (
          <Field label="Cuarto árbitro" error={errors.fourthOfficial?.message}>
            <StyledInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Cuarto árbitro"
              hasError={!!errors.fourthOfficial}
            />
          </Field>
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
