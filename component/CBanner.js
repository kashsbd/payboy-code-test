import { Image } from "react-native";
import { Banner } from "react-native-paper";

export default function CBanner({
  visible = false,
  message = "Something is wrong!",
  onOkayPressed = () => {},
}) {
  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: "Okay",
          onPress: onOkayPressed,
        },
      ]}
      icon={({ size }) => (
        <Image
          source={{
            uri: "https://avatars3.githubusercontent.com/u/17571969?s=400&v=4",
          }}
          style={{
            width: size,
            height: size,
          }}
        />
      )}
    >
      {message}
    </Banner>
  );
}
