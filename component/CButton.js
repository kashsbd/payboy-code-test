import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function CButton({ label = "", onPress = () => {} }) {
  return (
    <Button style={styles.btn} mode="contained" onPress={onPress}>
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 170,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "rgb(126,152,214)",
  },
});
