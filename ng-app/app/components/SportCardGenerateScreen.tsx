import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SportCard } from "../schemas/sport-card";
import { generatePdf } from "../services/SportCardPdfService";
import Toast from "react-native-toast-message";

type SportCardGenerateScreenProps = {
  payload: SportCard | null;
  onBack?: () => void;
};

export default function SportCardGenerateScreen({
  payload,
  onBack,
}: SportCardGenerateScreenProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerate = async () => {
    if (!payload) return;

    try {
      setIsSubmitting(true);

      await generatePdf(payload);

      Toast.show({
        type: "success",
        text1: "PDF generado",
        text2: `Archivo guardado correctamente`,
        position: "bottom",
        bottomOffset: 40,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al generar el PDF",
        text2: error instanceof Error ? error.message : "Error al generar el PDF",
        position: "bottom",
        bottomOffset: 40,
      });
    }
      finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-50"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <Text className="text-lg font-medium text-neutral-900 mb-1">
        Generar cédula
      </Text>
      <Text className="text-xs text-neutral-400 mb-5">
        Revisa la información antes de generar el PDF
      </Text>

      {!payload ? (
        <View className="p-4 rounded-2xl bg-red-50 border border-red-200">
          <Text className="text-red-600 text-sm">
            No hay información suficiente para generar la cédula.
          </Text>
        </View>
      ) : (
        <View className="gap-3">
          <View className="p-4 rounded-2xl bg-white border border-neutral-200">
            <Text className="text-sm font-semibold text-neutral-800 mb-2">
              Partido
            </Text>
            <Text className="text-sm text-neutral-600">
              Competición: {payload.matchInfo.competitionName}
            </Text>
            <Text className="text-sm text-neutral-600">
              Fecha: {payload.matchInfo.date.toDateString()}
            </Text>
            <Text className="text-sm text-neutral-600">
              Lugar: {payload.matchInfo.fieldName}, {payload.matchInfo.city},{" "}
              {payload.matchInfo.state}
            </Text>
          </View>

          <View className="p-4 rounded-2xl bg-white border border-neutral-200">
            <Text className="text-sm font-semibold text-neutral-800 mb-2">
              Equipos
            </Text>
            <Text className="text-sm text-neutral-600">
              Local: {payload.homeTeam.teamName}
            </Text>
            <Text className="text-sm text-neutral-600">
              Visitante: {payload.awayTeam.teamName}
            </Text>
          </View>

          <View className="p-4 rounded-2xl bg-white border border-neutral-200">
            <Text className="text-sm font-semibold text-neutral-800 mb-2">
              Árbitro principal
            </Text>
            <Text className="text-sm text-neutral-600">
              {payload.refereeCrew.referee}
            </Text>
          </View>
        </View>
      )}

      <View className="mt-8 flex-row gap-3">
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            disabled={isSubmitting}
            className="flex-1 h-11 rounded-xl border border-neutral-300 items-center justify-center"
          >
            <Text className="text-neutral-700 text-sm font-medium">Atrás</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleGenerate}
          disabled={isSubmitting || !payload}
          className={`flex-1 h-11 rounded-xl items-center justify-center ${
            isSubmitting || !payload ? "bg-blue-300" : "bg-blue-500"
          }`}
        >
          {isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <Text className="text-white text-sm font-medium">Generar PDF</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
