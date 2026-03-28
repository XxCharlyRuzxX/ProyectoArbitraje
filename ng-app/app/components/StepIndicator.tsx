import { Text, View } from "react-native";

type StepStatus = "done" | "active" | "pending";

interface Step {
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

function getStatus(index: number, currentStep: number): StepStatus {
  if (index < currentStep) return "done";
  if (index === currentStep) return "active";
  return "pending";
}

function StepCircle({ status, index }: { status: StepStatus; index: number }) {
  const baseClass = "w-7 h-7 rounded-full items-center justify-center";

  const bgClass = {
    done: "bg-teal-600",
    active: "bg-blue-500",
    pending: "bg-neutral-100 border border-neutral-300",
  }[status];

  const textClass = {
    done: "text-white text-xs font-medium",
    active: "text-white text-xs font-medium",
    pending: "text-neutral-400 text-xs font-medium",
  }[status];

  return (
    <View className={`${baseClass} ${bgClass}`}>
      {status === "done" ? (
        <Text className={textClass}>✓</Text>
      ) : (
        <Text className={textClass}>{index + 1}</Text>
      )}
    </View>
  );
}

function StepLine({ done }: { done: boolean }) {
  return (
    <View
      className={`flex-1 h-px mb-3.5 ${done ? "bg-teal-600" : "bg-neutral-200"}`}
    />
  );
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <View className="flex-row items-center px-5 py-4">
      {steps.map((step, index) => {
        const status = getStatus(index, currentStep);
        const isLast = index === steps.length - 1;

        return (
          <View key={step.label} className="flex-row items-center flex-1">
            <View className="items-center gap-1">
              <StepCircle status={status} index={index} />
              <Text
                className={`text-[10px] ${
                  status === "active"
                    ? "text-blue-500 font-medium"
                    : status === "done"
                      ? "text-teal-600"
                      : "text-neutral-400"
                }`}
              >
                {step.label}
              </Text>
            </View>
            {!isLast && <StepLine done={status === "done"} />}
          </View>
        );
      })}
    </View>
  );
}
