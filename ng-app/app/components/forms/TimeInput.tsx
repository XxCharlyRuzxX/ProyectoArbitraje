import Field from "./Field";
import StyledInput from "./StyledInput";


interface TimeInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  optional?: boolean;
}

export default function TimeInput({
  label,
  value,
  onChange,
  onBlur,
  error,
  optional,
}: TimeInputProps) {
  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, "");
    if (digits.length <= 2) {
      onChange(digits);
    } else {
      onChange(`${digits.slice(0, 2)}:${digits.slice(2, 4)}`);
    }
  };

  return (
    <Field label={label} error={error} optional={optional}>
      <StyledInput
        value={value}
        onChangeText={handleChange}
        onBlur={onBlur}
        placeholder="16:05"
        hasError={!!error}
        keyboardType="numbers-and-punctuation"
        maxLength={5}
      />
    </Field>
  );
}