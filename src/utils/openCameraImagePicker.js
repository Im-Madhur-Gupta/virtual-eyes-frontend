import {
  requestCameraPermissionsAsync,
  launchCameraAsync,
} from "expo-image-picker";

const openCameraImagePicker = async () => {
  let permissionCamera = await requestCameraPermissionsAsync();

  if (permissionCamera.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  let cameraResult = await launchCameraAsync();

  if (cameraResult.cancelled === true) {
    return;
  }

  return {
    filename: cameraResult.uri.split("\\").pop().split("/").pop(),
    type: "image/jpeg",
    uri: cameraResult.uri,
  };
};

export default openCameraImagePicker;
