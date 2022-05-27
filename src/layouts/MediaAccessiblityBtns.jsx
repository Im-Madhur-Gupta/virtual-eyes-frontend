import { Flex, Button, Text } from "native-base";

const MediaAccessibiltyBtns = ({ onOpenCamera, onOpenGallery }) => {
  return (
    <Flex direction="row" align="center" justify="center">
      <Button
        onPress={onOpenCamera}
        style={{
          margin: 10,
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: "maroon",
        }}
      >
        <Text>Open Camera</Text>
      </Button>

      <Button
        onPress={onOpenGallery}
        style={{
          margin: 10,
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: "maroon",
        }}
      >
        <Text>Open Gallery</Text>
      </Button>
    </Flex>
  );
};

export default MediaAccessibiltyBtns;
