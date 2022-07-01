import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { useSelector } from "react-redux";

function HomeScreen() {
  const user = useSelector((state) => state.user);
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Text variant="displayLarge">{`Name : ${user.name}`}</Text>
          <Text variant="displayLarge">{`Age : ${user.age}`}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});

export default HomeScreen;
