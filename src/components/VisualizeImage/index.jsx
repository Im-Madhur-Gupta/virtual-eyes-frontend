import { useState } from "react";
import { Flex, Button, Text, Image, Center } from "native-base";

import styles from "../../layouts/globalStyleSheet";
import MediaAccessibiltyBtns from "../../layouts/MediaAccessiblityBtns";

import AxiosInstance from "../../services/AxiosInstance";
import createFormData from "../../utils/createFormData";
import openCameraImagePicker from "../../utils/openCameraImagePicker";
import useGalleryImagePicker from "../../hooks/useGalleryImagePicker";
import useStore from "../../store/user-store";

const VisualizeImage = () => {
  const setIsLoading = useStore((state) => state.setIsLoading);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDescription, setImageDescription] = useState(null);

  const [showGalleryImagePicker, setShowGalleryImagePicker, GallerImagePicker] =
    useGalleryImagePicker(false, setSelectedImage, () => {
      console.log("cancelled");
    });

  const openCameraHandler = () => {
    openCameraImagePicker(setSelectedImage);
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
    <Flex style={styles.flexContainerColumn}>
      {showGalleryImagePicker ? (
        GallerImagePicker
      ) : (
        <>
          <Center style={styles.selectedImageContainer}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage.uri }}
                style={styles.selectedImage}
              />
            ) : (
              <Text>Please select an image.</Text>
            )}
          </Center>

          <Center>
            <MediaAccessibiltyBtns
              onOpenCamera={openCameraHandler}
              onOpenGallery={openGalleryHandler}
            />
            <Button onPress={describeImageHandler}>Describe Image</Button>
          </Center>

          <Center style={styles.resultContainer}>
            <Text>Description of the Image</Text>
            {imageDescription ? (
              <Text>{imageDescription.description}</Text>
            ) : (
              <Text>Please select an image.</Text>
            )}
          </Center>
        </>
      )}
    </Flex>
  );
};

export default VisualizeImage;
