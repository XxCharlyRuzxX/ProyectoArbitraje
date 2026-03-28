import { TextInput, TextInputProps } from "react-native";

interface StyledInputProps extends Omit<TextInputProps, "style"> {
  hasError?: boolean;
}

export default function StyledInput({ hasError, ...props }: StyledInputProps) {
  return (
    <TextInput
      placeholderTextColor="#a3a3a3"
      className={`h-10 px-3 rounded-lg border text-sm text-neutral-900 bg-white ${
        hasError ? "border-red-400" : "border-neutral-300"
      }`}
      {...props}
    />
  );
}
