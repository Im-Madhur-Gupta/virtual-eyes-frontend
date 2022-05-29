import { Flex, Button, Text } from "native-base";

import globalStyles from "./globalStyleSheet";

const MediaAccessibiltyBtns = ({ onOpenCamera, onOpenGallery }) => {
  return (
    <Flex direction="row" align="center" justify="center">
      <Button onPress={onOpenCamera} style={globalStyles.secondaryBtn}>
        <Text style={globalStyles.secondaryBtnTxt}>Open Camera</Text>
      </Button>

      <Button onPress={onOpenGallery} style={globalStyles.secondaryBtn}>
        <Text style={globalStyles.secondaryBtnTxt}>Open Gallery</Text>
      </Button>
    </Flex>
  );
};

export default MediaAccessibiltyBtns;
