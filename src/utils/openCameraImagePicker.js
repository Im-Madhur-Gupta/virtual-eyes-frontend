import * as ImagePicker from "expo-image-picker";

let openCameraImagePicker = async (setSelectedImage) => {
  let permissionCamera = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionCamera.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let cameraResult = await ImagePicker.launchCameraAsync();

  if (cameraResult.cancelled === true) {
    return;
  }

  setSelectedImage({
    filename: cameraResult.uri.split("\\").pop().split("/").pop(),
    type: "image/jpeg",
    uri: cameraResult.uri,
  });
};

export default openCameraImagePicker;
