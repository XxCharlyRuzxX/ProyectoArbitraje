import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Field from "./Field";

interface DatePickerFieldProps {
  label: string;
  value: string;
  onChange: (iso: string) => void;
  error?: string;
  optional?: boolean;
}

export default function DatePickerField({
  label,
  value,
  onChange,
  error,
  optional,
}: DatePickerFieldProps) {
  const [open, setOpen] = useState(false);
  const currentDate = value ? new Date(value) : new Date();

  const formatDisplay = (iso: string) => {
    return new Date(iso).toLocaleDateString("es-MX", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (!selected) return;
    if (Platform.OS === "android") setOpen(false);
    onChange(selected.toISOString());
  };

  return (
    <Field label={label} error={error} optional={optional}>
      {/* Botón selector */}
      <TouchableOpacity
        onPress={() => setOpen((v) => !v)}
        className={`h-10 px-3 rounded-lg border bg-white flex-row items-center justify-between ${
          error ? "border-red-400" : open ? "border-violet-400" : "border-neutral-300"
        }`}
      >
        <Text className={`text-sm ${value ? "text-neutral-900" : "text-neutral-400"}`}>
          {value ? formatDisplay(value) : "Seleccionar fecha..."}
        </Text>
        <Text className="text-xs text-neutral-400">{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {open && (
        <View className="mt-1 border border-neutral-200 rounded-xl overflow-hidden bg-white">
          <DateTimePicker
            value={currentDate}
            mode="date"
            display="inline"
            onChange={handleChange}
            locale="es-MX"
            accentColor="#534AB7"
            style={{ height: 320 }}
          />
          {Platform.OS === "ios" && (
            <TouchableOpacity
              onPress={() => setOpen(false)}
              className="items-center py-2.5 border-t border-neutral-200"
            >
              <Text className="text-sm font-medium text-violet-600">Listo</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </Field>
  );
}