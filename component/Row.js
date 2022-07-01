import { StyleSheet, View } from "react-native";

export default function Row({ children }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
});
