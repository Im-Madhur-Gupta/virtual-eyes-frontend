import axiosInstance from "../services/axiosInstance.js";
import createFormData from "./createFormData";

const addFaceToPersonGroup = async (
  image,
  facename,
  hasMultiplePhotos = true
) => {
  console.log("addFaceToPersonGroup - image", image);
  try {
    const formData = createFormData(
      image,
      "images",
      { face_name: facename },
      hasMultiplePhotos
    );
    console.log("addFaceToPersonGroup - formData", formData);

    const response = await axiosInstance.post(
      "/match-face/add-face",
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
          transformRequest: (data) => data,
          responseType: "json",
        },
      }
    );

    console.log("addFaceToPersonGroup - response", response.data);
  } catch (err) {
    console.log(err);
  }
};

export default addFaceToPersonGroup;
