import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import CButton from "../../component/CButton";
import LabeledInput from "../../component/LabeledInput";
import Row from "../../component/Row";

function CreateUserScreen() {
  const [imagePath, setImagePath] = useState(null);
  const { control, handleSubmit } = useForm();

  const _onTakePhotoBtnPressed = () => {};

  const _onSubmitBtnPressed = (data) => {
    const { age, name, location } = data;
    console.log(age)
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Text style={styles.photoTxtStyle}>Photo</Text>
        </View>
      </View>
      <View style={styles.textinputContainer}>
        <Row>
          <LabeledInput label="Name" name="name" control={control} />
        </Row>
        <Row>
          <LabeledInput
            label="Age"
            name="age"
            control={control}
            defaultValue={1}
            keyboardType="numeric"
          />
        </Row>
        <Row>
          <LabeledInput
            label="Location"
            name="location"
            control={control}
            disabled
          />
        </Row>
      </View>
      <View style={styles.buttonContainer}>
        <CButton label="TAKE PHOTO" onPress={_onTakePhotoBtnPressed} />
        <CButton label="SUBMIT" onPress={handleSubmit(_onSubmitBtnPressed)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 3.3,
    justifyContent: "center",
    alignItems: "center",
  },
  textinputContainer: {
    flex: 3.3,
    marginHorizontal: 12,
  },
  buttonContainer: {
    flex: 3.3,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imageWrapper: {
    borderWidth: 1,
    width: 110,
    height: 110,
  },
  photoTxtStyle: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default CreateUserScreen;
