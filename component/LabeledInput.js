import { useController } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";

export default function LabeledInput({ name, control, label, disabled }) {
  const { field } = useController({ control, defaultValue: "", name });
  return (
    <>
      <Text variant="displayLarge" style={styles.textStyle}>
        {label}
      </Text>
      <TextInput
        mode="outlined"
        value={field.value}
        onChangeText={field.onChange}
        style={styles.textInputStyle}
        disableFullscreenUI
        disabled={disabled}
      />
    </>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    flex: 2,
  },
  textInputStyle: {
    flex: 8,
    height: 45
  },
});
