import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";

import CButton from "../../component/CButton";
import LabeledInput from "../../component/LabeledInput";
import Row from "../../component/Row";
import { submitNameAndAge } from "../redux/userSlice";

function CreateUserScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
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
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const _onSubmitBtnPressed = ({ age, name, location }) => {
    console.log(location);
    if (!imageUri) {
      alert("Photo is required.");
      return;
    } else if (name.length === 0) {
      alert("Name is required.");
      return;
    } else if (age < 0) {
      alert("Age can't be negative or zero.");
      return;
    } else if (!location) {
      console.log(location);
      alert("Location is required.");
      return;
    } else {
      dispatch(submitNameAndAge({ name, age }));
      navigation.jumpTo("Home");
    }
  };

  const locString = location
    ? `lat:${location.coords.latitude}, lon:${location.coords.longitude}`
    : "";

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
            name="location"
            defaultValue={locString}
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
