import { useState } from "react";
import { View } from "react-native";
import MatchInfoScreen from "../components/MatchInfoScreen";
import MatchRefereesScreen from "../components/MatchRefereesScreen";
import MatchTeamsScreen from "../components/MatchTeamsScreen";
import ObservationsScreen from "../components/ObservationsScreen";
import SportCardGenerateScreen from "../components/SportCardGenerateScreen";
import { buildSportCard } from "../schemas/mappers/sport-card-mapper";
import { SportCardDraft } from "../interfaces/sport-card";



export default function SportCardScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  const [draft, setDraft] = useState<SportCardDraft>({
    matchInfo: undefined,
    refereeCrew: undefined,
    homeTeam: undefined,
    awayTeam: undefined,
    observations: { observations: [] },
  });

  const goNext = () => setCurrentStep((prev) => prev + 1);
  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <View className="flex-1 bg-neutral-50 px-5 pt-5">
      {currentStep === 0 && (
        <MatchInfoScreen
          initialData={draft.matchInfo}
          onNext={(data) => {
            setDraft((prev) => ({ ...prev, matchInfo: data }));
            goNext();
          }}
        />
      )}

      {currentStep === 1 && (
        <MatchRefereesScreen
          initialData={draft.refereeCrew}
          onBack={goBack}
          onNext={(data) => {
            setDraft((prev) => ({ ...prev, refereeCrew: data }));
            goNext();
          }}
        />
      )}

      {currentStep === 2 && (
        <MatchTeamsScreen
          title="Equipo local"
          initialData={draft.homeTeam}
          onBack={goBack}
          onNext={(data) => {
            setDraft((prev) => ({ ...prev, homeTeam: data }));
            goNext();
          }}
        />
      )}

      {currentStep === 3 && (
        <MatchTeamsScreen
          title="Equipo visitante"
          initialData={draft.awayTeam}
          onBack={goBack}
          onNext={(data) => {
            setDraft((prev) => ({ ...prev, awayTeam: data }));
            goNext();
          }}
        />
      )}

      {currentStep === 4 && (
        <ObservationsScreen
          initialData={draft.observations}
          onBack={goBack}
          onNext={(data) => {
            setDraft((prev) => ({ ...prev, observations: data }));
            goNext();
          }}
        />
      )}

      {currentStep === 5 && (
        <SportCardGenerateScreen
          payload={buildSportCard(draft)}
          onBack={goBack}
        />
      )}
    </View>
  );
}
