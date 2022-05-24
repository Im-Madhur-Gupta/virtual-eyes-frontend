import { Heading } from "native-base";
import { useState } from "react";
import openCameraImagePicker from "../../utils/openCameraImagePicker";
import openGalleryImagePicker from "../../hooks/useGalleryImagePicker";

const AddFace = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openCameraHandler = () => {
    openCameraImagePicker(setSelectedImage);
  };
  const openGalleryHandler = () => {
    openGalleryImagePicker(setSelectedImage);
  };

  const addFaceHandler = () => {
    if (selectedImage) {
      console.log(selectedImage.uri);
      const data = createFormData(selectedImage);
      console.log("data", data);
      AxiosInstance.post("/visualize-image", data, {
        headers: {
          "Content-Type": `multipart/form-data`,
          transformRequest: (data) => {
            return data;
          },
          responseType: "json",
        },
      })
        .then((res) => {
          console.log("DECRIPTION", res.data);
          setImageDescription(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <Heading>Add Face</Heading>
    </>
  );
};

export default AddFace;
