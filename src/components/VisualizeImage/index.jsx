import { useState } from "react";
import { Flex, Button, Text, Image, Center } from "native-base";

import MediaAccessibiltyBtns from "../../layouts/MediaAccessiblityBtns";

import AxiosInstance from "../../services/AxiosInstance";
import createFormData from "../../utils/createFormData";
import openCameraImagePicker from "../../utils/openCameraImagePicker";
import useGalleryImagePicker from "../../hooks/useGalleryImagePicker";
import useStore from "../../store/user-store";
import globalStyles from "../../layouts/globalStyleSheet";

const VisualizeImage = () => {
  const setIsLoading = useStore((state) => state.setIsLoading);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDescription, setImageDescription] = useState(null);

  const [showGalleryImagePicker, setShowGalleryImagePicker, GallerImagePicker] =
    useGalleryImagePicker(false, setSelectedImage, () => {
      console.log("cancelled");
    });

  const openCameraHandler = async () => {
    const capturedImage = openCameraImagePicker();
    setSelectedImage(capturedImage);
  };
  const openGalleryHandler = () => {
    setShowGalleryImagePicker(true);
  };

  const describeImageHandler = async () => {
    try {
      if (selectedImage) {
        setIsLoading(true);

        console.log("DescribeImage - SELECTED IMAGE - ", selectedImage);

        const formData = createFormData(selectedImage, "image");
        console.log("DescribeImage - FORM DATA - ", formData);

        const response = await AxiosInstance.post(
          "/visualize-image",
          formData,
          {
            headers: {
              "Content-Type": `multipart/form-data`,
              transformRequest: (data) => {
                return data;
              },
              responseType: "json",
            },
          }
        );

        setIsLoading(false);

        console.log("DescribeImage - IMAGE DESCRIPTION - ", response.data);
        setImageDescription(response.data);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <Flex style={globalStyles.flexContainerColumn}>
      {showGalleryImagePicker ? (
        GallerImagePicker
      ) : (
        <>
          <Center style={globalStyles.selectedImageContainer}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage.uri }}
                style={globalStyles.selectedImage}
              />
            ) : (
              <Text style={globalStyles.infoText}>Please select an image.</Text>
            )}
          </Center>

          <MediaAccessibiltyBtns
            onOpenCamera={openCameraHandler}
            onOpenGallery={openGalleryHandler}
          />

          <Center style={globalStyles.resultContainer}>
            <Text style={globalStyles.infoText}>
              Description of the Image
            </Text>
            {imageDescription && (
              <Text style={globalStyles.resultText}>
                {imageDescription.description}
              </Text>
            )}
          </Center>

          <Button
            onPress={describeImageHandler}
            style={globalStyles.primaryBtn}
          >
            <Text style={globalStyles.primaryBtnTxt}>Visualize Image</Text>
          </Button>
        </>
      )}
    </Flex>
  );
};

export default VisualizeImage;
