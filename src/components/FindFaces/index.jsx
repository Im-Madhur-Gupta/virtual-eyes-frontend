import { useState } from "react";
import { Button, Flex, Image, Text, Heading, Center } from "native-base";

import styles from "../../layouts/globalStyleSheet";
import MediaAccessibiltyBtns from "../../layouts/MediaAccessiblityBtns";

import AxiosInstance from "../../services/AxiosInstance";
import createFormData from "../../utils/createFormData";
import openCameraImagePicker from "../../utils/openCameraImagePicker";
import useGalleryImagePicker from "../../hooks/useGalleryImagePicker";
import useStore from "../../store/user-store";

const FindFaces = () => {
  const setIsLoading = useStore((state) => state.setIsLoading);

  const [selectedImage, setSelectedImage] = useState(null);
  const [foundFacesData, setFoundFacesData] = useState({
    detectedPersons: [],
    message: "",
  });

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

  const findFacesHandler = async () => {
    try {
      if (selectedImage) {
        setIsLoading(true);
        console.log("FindFaces - SELECTEDIMAGE - ", selectedImage);

        const formData = createFormData(selectedImage, "image");
        console.log("FindFaces - DATA - ", formData);

        const response = await AxiosInstance.post(
          "/match-face/find-faces",
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

        console.log("FindFaces - RESPONSE.DATA - ", response.data);
        setIsLoading(false);
        setFoundFacesData(response.data);
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
          <Heading paddingTop={5}>Selected Image</Heading>

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
            <Button onPress={findFacesHandler}>Find Faces</Button>
          </Center>

          <Center style={styles.resultContainer}>
            <Text>Faces present in the Image</Text>
            {/* Conditional rendering of output content */}
            {foundFacesData.detectedPersons.length > 0 ? (
              <>
                {foundFacesData.detectedPersons.map((face) => (
                  <Text key={face.id}>{face.name}</Text>
                ))}
              </>
            ) : (
              <Text>{foundFacesData.message}</Text>
            )}
          </Center>
        </>
      )}
    </Flex>
  );
};

export default FindFaces;
