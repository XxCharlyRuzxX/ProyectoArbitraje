import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import Field from "./forms/Field";
import StyledInput from "./forms/StyledInput";
import { ObservationsForm, ObservationsFormSchema } from "../schemas/sport-card-forms";
import { ZodError } from "zod";
import Toast from "react-native-toast-message";

type ObservationsScreenProps = {
  initialData?: ObservationsForm;
  onNext: (data: ObservationsForm) => void;
  onBack?: () => void;
};

export default function ObservationsScreen({
  initialData,
  onNext,
  onBack,
}: ObservationsScreenProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm<ObservationsForm>({
    resolver: zodResolver(ObservationsFormSchema),
    defaultValues: {
      observations: initialData?.observations ?? [],
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const observations = watch("observations");

  const addObservation = () => {
    const current = getValues("observations");
    setValue("observations", [...current, ""], { shouldValidate: true });
  };

  const removeObservation = (index: number) => {
    const current = getValues("observations");
    setValue(
      "observations",
      current.filter((_, i) => i !== index),
      { shouldValidate: true },
    );
  };

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
        Observaciones
      </Text>
      <Text className="text-xs text-neutral-400 mb-5">
        Observaciones generales sobre el partido
      </Text>

      {observations.map((_, index) => (
        <View key={index} className="mb-3">
          <Controller
            control={control}
            name={`observations.${index}` as const}
            render={({ field }) => (
              <Field
                label={`Observación ${index + 1}`}
                error={errors.observations?.[index]?.message}
              >
                <StyledInput
                  value={field.value ?? ""}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Escribe una observación sobre el partido"
                  hasError={!!errors.observations?.[index]}
                />
              </Field>
            )}
          />

          <TouchableOpacity
            onPress={() => removeObservation(index)}
            className="mt-1 h-9 rounded-xl bg-red-50 border border-red-200 items-center justify-center"
          >
            <Text className="text-xs text-red-500 font-medium">
              Eliminar observación
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        onPress={addObservation}
        className="h-11 rounded-xl border border-dashed border-neutral-300 items-center justify-center mb-1"
      >
        <Text className="text-sm text-neutral-400">+ Agregar observación</Text>
      </TouchableOpacity>

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
