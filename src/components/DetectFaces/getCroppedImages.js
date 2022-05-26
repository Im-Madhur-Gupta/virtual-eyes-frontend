import * as ImageManipulator from "expo-image-manipulator";

const getCroppedImages = async (imageURI, boxData) => {
  // boxData.map(async ()=>{...}) returns an array of Promise Objects
  // So, to handle all of the promises I had to use Promise.all()
  const cropResults = await Promise.all(
    boxData.map(
      async (box) =>
        await ImageManipulator.manipulateAsync(imageURI, [{ crop: box }])
    )
  );
  return cropResults;
};

export default getCroppedImages;
