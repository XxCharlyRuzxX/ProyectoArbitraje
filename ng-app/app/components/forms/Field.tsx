import { View , Text} from "react-native";

interface FieldProps {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}

export default function Field({ label, error, optional, children }: FieldProps) {
  return (
    <View className="mb-4">
      <View className="flex-row gap-1 mb-1">
        <Text className="text-xs font-medium text-neutral-500">{label}</Text>
        {optional && (
          <Text className="text-xs text-neutral-400">(opcional)</Text>
        )}
      </View>
      {children}
      {error && (
        <Text className="text-xs text-red-400 mt-1">{error}</Text>
      )}
    </View>
  );
}