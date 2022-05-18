import * as ImagePicker from "expo-image-picker";

let openGalleryImagePicker = async (setSelectedImage) => {
  let permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();

  setSelectedImage({
    filename: pickerResult.uri.split("\\").pop().split("/").pop(),
    type: "image/jpeg",
    uri: pickerResult.uri,
  });
};

export default openGalleryImagePicker;
