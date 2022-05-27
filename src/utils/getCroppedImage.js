import * as ImageManipulator from "expo-image-manipulator";

const getCroppedImage = async (imageURI, boxData) => {
  const cropResults = await ImageManipulator.manipulateAsync(imageURI, [
    { crop: boxData },
  ]);
  return cropResults;
};

export default getCroppedImage;
