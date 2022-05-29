import { StyleSheet, Dimensions } from "react-native";
import { Image, Box } from "native-base";

import globalStyles from "../../../layouts/globalStyleSheet";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const FaceImageCard = ({ item: image, index }) => {
  return (
    <Box
      style={{ ...globalStyles.selectedImageContainer, ...styles.container }}
      key={index}
    >
      <Image
        key={image.uri}
        source={{ uri: image.uri }}
        alt={image.filename}
        style={globalStyles.selectedImage}
        borderRadius={20}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: ITEM_WIDTH,
    elevation: 7,
  },
});

export default FaceImageCard;
