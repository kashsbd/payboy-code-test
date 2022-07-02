import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";

import CButton from "../../component/CButton";
import LabeledInput from "../../component/LabeledInput";
import Row from "../../component/Row";
import { submitNameAndAge } from "../redux/userSlice";

import { percentage } from "../utils/functions";

const windowHeight = Dimensions.get("window").height - 24;

function CreateUserScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);

  const { control, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const locString = location
        ? `lat:${location.coords.latitude}, lon:${location.coords.longitude}`
        : "";

      setValue("loc", locString);
    };
    requestLocationPermission();
  }, []);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need these permissions to make this work!");
      }
    };
    requestCameraPermission();
  }, []);

  const _onTakePhotoBtnPressed = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const _onSubmitBtnPressed = (data) => {
    const { age, name, loc } = data;
    console.log(data);
    if (!imageUri) {
      alert("Photo is required.");
      return;
    } else if (name.length === 0) {
      alert("Name is required.");
      return;
    } else if (age.length === 0) {
      alert("Age is required.");
      return;
    } else if (+age <= 0) {
      alert("Age can't be negative or zero.");
      return;
    } else if (loc.length === 0) {
      alert("Location is required.");
      return;
    } else {
      dispatch(submitNameAndAge({ name, age }));
      navigation.jumpTo("Home");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps={"always"}
      removeClippedSubviews={false}
    >
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imageWrapper} />
        ) : (
          <View style={styles.imageWrapper}>
            <Text style={styles.photoTxtStyle}>Photo</Text>
          </View>
        )}
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
            defaultValue={"1"}
            keyboardType="numeric"
            maxLength={3}
          />
        </Row>
        <Row>
          <LabeledInput
            label="Location"
            name="loc"
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
    height: windowHeight,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: percentage(30, windowHeight),
  },
  textinputContainer: {
    marginHorizontal: 12,
    height: percentage(30, windowHeight),
  },
  buttonContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height: percentage(24, windowHeight),
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
